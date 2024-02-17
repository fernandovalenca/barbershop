import BookingCard from '@/components/shared/booking-item';
import Header from '@/components/shared/header';
import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/');
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
      orderBy: {
        date: 'asc',
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
      orderBy: {
        date: 'asc',
      },
    }),
  ]);

  return (
    <main>
      <Header />
      <h1 className="px-5 py-6 text-xl font-semibold">Agendamentos</h1>
      {confirmedBookings.length > 0 && (
        <div className="px-5 mb-6">
          <h2 className="text-gray-400 text-sm uppercase">Confirmados</h2>
          <div className="flex flex-col gap-3 mt-3">
            {confirmedBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={{
                  ...booking,
                  service: {
                    ...booking.service,
                    price: Number(booking.service.price),
                  },
                }}
              />
            ))}
          </div>
        </div>
      )}

      {finishedBookings.length > 0 && (
        <div className="px-5">
          <h2 className="text-gray-400 text-sm uppercase">Finalizados</h2>
          <div className="flex flex-col gap-3 mt-3">
            {finishedBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={{
                  ...booking,
                  service: {
                    ...booking.service,
                    price: Number(booking.service.price),
                  },
                }}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
