import { getAuthUser } from '@/lib/auth';
import { successResponse, unauthorizedResponse, errorResponse } from '@/lib/api-response';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return unauthorizedResponse();

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: { id: true, email: true, name: true, avatar: true, role: true, createdAt: true },
    });

    if (!user) return unauthorizedResponse();
    return successResponse(user);
  } catch {
    return errorResponse('Internal server error', 500);
  }
}
