import { getAuthUser } from '@/lib/auth';
import { createProjectSchema } from '@/lib/validations/project';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorizedResponse();

    const projects = await prisma.project.findMany({
      where: { members: { some: { userId: user.id } } },
      include: {
        owner: { select: { id: true, name: true, email: true, avatar: true } },
        members: {
          include: { user: { select: { id: true, name: true, email: true, avatar: true } } },
        },
        _count: { select: { tasks: true, members: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(projects);
  } catch {
    return errorResponse('Internal server error', 500);
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorizedResponse();

    const body = await req.json();
    const parsed = createProjectSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.issues[0].message);

    const project = await prisma.$transaction(async tx => {
      const p = await tx.project.create({
        data: { ...parsed.data, ownerId: user.id },
      });
      await tx.projectMember.create({ data: { projectId: p.id, userId: user.id, role: 'ADMIN' } });
      return tx.project.findUnique({
        where: { id: p.id },
        include: {
          members: {
            include: { user: { select: { id: true, name: true, email: true, avatar: true } } },
          },
          _count: { select: { tasks: true, members: true } },
        },
      });
    });

    return successResponse(project, 201);
  } catch {
    return errorResponse('Internal server error', 500);
  }
}
