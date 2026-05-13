import { PrismaClient } from '../generated/prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// For client engine (default), we need to use Accelerate or driver adapters
// For development, we use the httpServer transport
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Use the DATABASE_URL with http transport in development
  } as any);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
