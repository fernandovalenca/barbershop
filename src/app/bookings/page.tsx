import Header from '@/components/shared/header';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { db } from '@/lib/prisma';
import BookingCard from '@/components/shared/booking-item';
import Booking from '@/core/domain/entities/booking';
import Service from '@/core/domain/entities/service';
import Barbershop from '@/core/domain/entities/barbershop';
import { endOfDay, isFuture, isPast, startOfDay } from 'date-fns';

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/');
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  });

  const serializedBookings = bookings.map((booking) => {
    return {
      id: booking.id,
      date: booking.date,
      userId: booking.userId,
      serviceId: booking.serviceId,
      barbershopId: booking.barbershopId,
      service: {
        ...booking.service,
        price: Number(booking.service.price),
      },
      barbershop: {
        ...booking.barbershop,
      },
    };
  });

  const confirmedBookings = serializedBookings.filter((booking) =>
    isFuture(booking.date)
  );
  const finishedBookings = serializedBookings.filter((booking) =>
    isPast(booking.date)
  );

  return (
    <main>
      <Header />
      <h1 className="px-5 py-6 text-xl font-semibold">Agendamentos</h1>
      <div className="px-5">
        <h2 className="text-gray-400 text-sm uppercase">Confirmados</h2>
        <div className="flex flex-col gap-3 mt-3">
          {confirmedBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>

      <div className="px-5">
        <h2 className="text-gray-400 text-sm uppercase mt-6">Finalizados</h2>
        <div className="flex flex-col gap-3 mt-3">
          {finishedBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </main>
  );
}
