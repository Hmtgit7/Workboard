import { getAuthUser } from '@/lib/auth';
import { addMemberSchema } from '@/lib/validations/project';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
} from '@/lib/api-response';
import prisma from '@/lib/db';

type Params = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Params) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorizedResponse();
    const { id: projectId } = await params;

    const membership = await prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId: user.id } },
    });
    if (!membership || membership.role !== 'ADMIN') return forbiddenResponse();

    const body = await req.json();
    const parsed = addMemberSchema.safeParse(body);
    if (!parsed.success) return errorResponse(parsed.error.issues[0].message);

    const invitee = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (!invitee) return notFoundResponse('User');

    const existing = await prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId: invitee.id } },
    });
    if (existing) return errorResponse('User is already a member', 409);

    const member = await prisma.projectMember.create({
      data: { projectId, userId: invitee.id, role: parsed.data.role },
      include: { user: { select: { id: true, name: true, email: true, avatar: true } } },
    });

    return successResponse(member, 201);
  } catch {
    return errorResponse('Internal server error', 500);
  }
}
