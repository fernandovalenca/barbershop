import Header from '@/components/shared/header';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { db } from '@/lib/prisma';
import BookingCard from '@/components/shared/booking-item';

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
      }
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
        date: 'desc',
      }
    }),
  ]);

  return (
    <main>
      <Header />
      <h1 className="px-5 py-6 text-xl font-semibold">Agendamentos</h1>
      <div className="px-5">
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

      <div className="px-5">
        <h2 className="text-gray-400 text-sm uppercase mt-6">Finalizados</h2>
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
    </main>
  );
}
