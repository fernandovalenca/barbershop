'use server';

import { db } from '@/lib/prisma';
import { endOfDay, startOfDay } from 'date-fns';

export default async function getDayBookings(barbershopId: string, date: Date) {
  const bookings = await db.booking.findMany({
    where: {
      barbershopId: barbershopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });

  return bookings;
}
