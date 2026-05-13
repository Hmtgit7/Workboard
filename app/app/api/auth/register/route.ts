import { cookies } from 'next/headers';
import { registerSchema } from '@/lib/validations/auth';
import { hashPassword, signToken, setAuthCookie } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message);
    }

    const { name, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return errorResponse('Email already in use', 409);

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
      select: { id: true, email: true, name: true, role: true },
    });

    const token = signToken({ sub: user.id, email: user.email, name: user.name, role: user.role });
    const cookieStore = await cookies();
    cookieStore.set(setAuthCookie(token));

    return successResponse({ user, token }, 201);
  } catch {
    return errorResponse('Internal server error', 500);
  }
}
