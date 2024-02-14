'use server';

import { db } from '@/lib/prisma';

export default async function cancelBooking(id: string) {
  await db.booking.delete({
    where: {
      id: id,
    },
  });
}
