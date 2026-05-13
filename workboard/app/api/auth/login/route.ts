import { cookies } from 'next/headers';
import { loginSchema } from '@/lib/validations/auth';
import { comparePassword, signToken, setAuthCookie } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message);
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return errorResponse('Invalid email or password', 401);

    const valid = await comparePassword(password, user.password);
    if (!valid) return errorResponse('Invalid email or password', 401);

    const token = signToken({ sub: user.id, email: user.email, name: user.name, role: user.role });
    const cookieStore = await cookies();
    cookieStore.set(setAuthCookie(token));

    return successResponse({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    });
  } catch {
    return errorResponse('Internal server error', 500);
  }
}
