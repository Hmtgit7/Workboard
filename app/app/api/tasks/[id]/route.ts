import { getAuthUser } from '@/lib/auth';
import { updateTaskSchema } from '@/lib/validations/task';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
} from '@/lib/api-response';
import prisma from '@/lib/db';

type Params = { params: Promise<{ id: string }> };

async function canAccessTask(taskId: string, userId: string) {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) return { task: null, membership: null };
  const membership = await prisma.projectMember.findUnique({
    where: { projectId_userId: { projectId: task.projectId, userId } },
  });
  return { task, membership };
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorizedResponse();
    const { id } = await params;

    const { task, membership } = await canAccessTask(id, user.id);
    if (!task) return notFoundResponse('Task');
    if (!membership) return forbiddenResponse();

    // Members can only update tasks assigned to them (unless admin)
    const isAdmin = membership.role === 'ADMIN';
    const isAssignee = task.assigneeId === user.id;
    const isCreator = task.createdById === user.id;
    if (!isAdmin && !isAssignee && !isCreator) return forbiddenResponse();

    const body = await req.json();
    const parsed = updateTaskSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.issues[0].message);

    const updated = await prisma.task.update({
      where: { id },
      data: {
        ...parsed.data,
        dueDate:
          parsed.data.dueDate !== undefined
            ? parsed.data.dueDate
              ? new Date(parsed.data.dueDate)
              : null
            : undefined,
      },
      include: {
        assignee: { select: { id: true, name: true, email: true, avatar: true } },
        createdBy: { select: { id: true, name: true } },
        project: { select: { id: true, name: true, color: true } },
      },
    });

    return successResponse(updated);
  } catch {
    return errorResponse('Internal server error', 500);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorizedResponse();
    const { id } = await params;

    const { task, membership } = await canAccessTask(id, user.id);
    if (!task) return notFoundResponse('Task');
    if (!membership || (membership.role !== 'ADMIN' && task.createdById !== user.id))
      return forbiddenResponse();

    await prisma.task.delete({ where: { id } });
    return successResponse({ message: 'Task deleted' });
  } catch {
    return errorResponse('Internal server error', 500);
  }
}
