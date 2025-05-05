// lib/actions.ts
'use server';

import prisma from './prisma';

export async function updateUserName(userId: string, newName: string) {
  if (!userId || !newName.trim()) return;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name: newName.trim() },
    });
  } catch (error) {
    console.error('Error updating user name:', error);
  }
}
