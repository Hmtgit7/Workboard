import { getAuthUser } from '@/lib/auth';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
} from '@/lib/api-response';
import prisma from '@/lib/db';

type Params = { params: Promise<{ id: string; userId: string }> };

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorizedResponse();
    const { id: projectId, userId: targetUserId } = await params;

    const membership = await prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId: user.id } },
    });
    // Allow self-leave OR admin removal
    const isSelf = user.id === targetUserId;
    if (!isSelf && (!membership || membership.role !== 'ADMIN')) return forbiddenResponse();

    // Prevent removing the project owner
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (project?.ownerId === targetUserId) return errorResponse('Cannot remove project owner', 400);

    await prisma.projectMember.delete({
      where: { projectId_userId: { projectId, userId: targetUserId } },
    });

    return successResponse({ message: 'Member removed' });
  } catch {
    return errorResponse('Internal server error', 500);
  }
}
