'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function cancelBooking(id: string) {
  await db.booking.delete({
    where: {
      id: id,
    },
  });

  revalidatePath('');
}
