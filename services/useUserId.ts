// services/userService.ts
import prisma from '@/lib/prisma';

export const getUserId = async (email: string | null | undefined |any): Promise<string | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return user?.id?.toString() || null;
  } catch (error) {
    console.error('Error fetching user ID from the database', error);
    return null;
  }
};
