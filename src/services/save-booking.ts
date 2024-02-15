'use server';

import Booking from '@/core/domain/entities/booking';
import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type Input = {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
};

export default async function saveBooking(input: Input) {
  const booking = Booking.create(input);
  await db.booking.create({
    data: {
      id: booking.id,
      date: booking.date,
      userId: booking.userId,
      serviceId: booking.serviceId,
      barbershopId: booking.barbershopId,
    },
  });

  revalidatePath('/');
  revalidatePath('/bookings');
}
