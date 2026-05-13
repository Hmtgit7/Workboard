import { getAuthUser } from '@/lib/auth';
import { updateProjectSchema } from '@/lib/validations/project';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  notFoundResponse,
  forbiddenResponse,
} from '@/lib/api-response';
import prisma from '@/lib/db';

type Params = { params: Promise<{ id: string }> };

async function getProjectMember(projectId: string, userId: string) {
  return prisma.projectMember.findUnique({ where: { projectId_userId: { projectId, userId } } });
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorizedResponse();
    const { id } = await params;

    const membership = await getProjectMember(id, user.id);
    if (!membership) return forbiddenResponse();

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true, email: true, avatar: true } },
        members: {
          include: { user: { select: { id: true, name: true, email: true, avatar: true } } },
        },
        tasks: {
          include: {
            assignee: { select: { id: true, name: true, email: true, avatar: true } },
            createdBy: { select: { id: true, name: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: { select: { tasks: true, members: true } },
      },
    });

    if (!project) return notFoundResponse('Project');
    return successResponse(project);
  } catch {
    return errorResponse('Internal server error', 500);
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorizedResponse();
    const { id } = await params;

    const membership = await getProjectMember(id, user.id);
    if (!membership || membership.role !== 'ADMIN') return forbiddenResponse();

    const body = await req.json();
    const parsed = updateProjectSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.issues[0].message);

    const project = await prisma.project.update({ where: { id }, data: parsed.data });
    return successResponse(project);
  } catch {
    return errorResponse('Internal server error', 500);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorizedResponse();
    const { id } = await params;

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return notFoundResponse('Project');
    if (project.ownerId !== user.id && user.role !== 'ADMIN') return forbiddenResponse();

    await prisma.project.delete({ where: { id } });
    return successResponse({ message: 'Project deleted' });
  } catch {
    return errorResponse('Internal server error', 500);
  }
}
