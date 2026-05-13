import { getAuthUser } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorizedResponse();

    const projectIds = (
      await prisma.projectMember.findMany({
        where: { userId: user.id },
        select: { projectId: true },
      })
    ).map((member: { projectId: string }) => member.projectId);

    const [allTasks, projects] = await Promise.all([
      prisma.task.findMany({
        where: { projectId: { in: projectIds } },
        include: {
          assignee: { select: { id: true, name: true, email: true, avatar: true } },
          project: { select: { id: true, name: true, color: true } },
        },
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.project.count({ where: { id: { in: projectIds } } }),
    ]);

    const now = new Date();
    const overdueTasks = allTasks.filter(
      task => task.dueDate && task.dueDate < now && task.status !== 'DONE'
    );
    const completedTasks = allTasks.filter(task => task.status === 'DONE');
    const inProgressTasks = allTasks.filter(task => task.status === 'IN_PROGRESS');

    const tasksByStatus = {
      TODO: allTasks.filter(task => task.status === 'TODO').length,
      IN_PROGRESS: inProgressTasks.length,
      IN_REVIEW: allTasks.filter(task => task.status === 'IN_REVIEW').length,
      DONE: completedTasks.length,
    };

    const upcomingDeadlines = allTasks
      .filter(task => task.dueDate && task.dueDate >= now && task.status !== 'DONE')
      .sort(
        (a, b) =>
          new Date(a.dueDate as string | Date).getTime() -
          new Date(b.dueDate as string | Date).getTime()
      )
      .slice(0, 5);

    return successResponse({
      totalProjects: projects,
      totalTasks: allTasks.length,
      completedTasks: completedTasks.length,
      overdueTasks: overdueTasks.length,
      inProgressTasks: inProgressTasks.length,
      tasksByStatus,
      recentTasks: allTasks.slice(0, 8),
      upcomingDeadlines,
    });
  } catch {
    return errorResponse('Internal server error', 500);
  }
}
