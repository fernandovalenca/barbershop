import BookingCard from '@/components/shared/booking-item';
import Header from '@/components/shared/header';
import Search from '@/components/shared/search';
import { db } from '@/lib/prisma';
import { endOfDay, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import BarbershopItem from './_component/barbershop-item';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const currentDate = new Date();
  const formattedCurrentDay = format(currentDate, "EEEE',' d 'de' MMMM", {
    locale: ptBR,
  });

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany(),
    session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session?.user as any).id,
            date: {
              gte: currentDate,
              lt: endOfDay(currentDate),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
          orderBy: {
            date: 'asc',
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <main>
      <Header />

      <div className="flex flex-col gap-1 px-5 pt-5">
        {session?.user ? (
          <h1 className="text-xl font-bold">
            Olá, {session.user.name?.split(' ')[0]}
          </h1>
        ) : (
          <h1 className="text-xl font-bold">Olá, faça seu login!</h1>
        )}
        <p className="text-sm">
          {formattedCurrentDay.charAt(0).toUpperCase() +
            formattedCurrentDay.slice(1)}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      {confirmedBookings.length > 0 && (
        <div className="px-5 mt-6">
          <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
            Próximos agendamentos ({confirmedBookings.length})
          </h2>
          <div className="flex flex-col gap-3">
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

      <div className="px-5 mt-6">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
          Recomendados
        </h2>
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
          Populares
        </h2>
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </main>
  );
}
