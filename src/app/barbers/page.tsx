import BookingCard from "@/components/shared/booking-item";
import Header from "@/components/shared/header";
import Search from "@/components/shared/search";
import { db } from "@/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import BarbershopItem from "./_component/barbershop-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ServiceItem from "@/components/shared/service-item";
import Link from "next/link";
import Barber from "./_component/barber";

export default async function BarbersPage() {
  const session = await getServerSession(authOptions);
  const currentDate = new Date();
  const formattedCurrentDay = format(currentDate, "EEEE',' d 'de' MMMM", {
    locale: ptBR,
  });

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: "ed87988a-354e-4b6a-bb0d-c6bd6950e52c",
    },
    include: { services: true, bookings: true },
  });

  if (!barbershop) return null;

  const serializedBarbershop = {
    ...barbershop,
    services: barbershop.services.map((service) => ({
      ...service,
      price: Number(service.price),
    })),
  };

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany(),
    session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session?.user as any).id,
            date: {
              gte: currentDate,
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
          orderBy: {
            date: "asc",
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
            Olá, {session.user.name?.split(" ")[0]}
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
        <header className="flex items-center justify-between  mb-3">
          <h2 className="text-xs uppercase text-gray-400 font-bold">
            Barbeiros
          </h2>
          <Link href="/barbers" className="text-xs text-primary">
            Ver todos
          </Link>
        </header>
        <div className="w-full flex items-center justify-center">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {barbershops.map((barbershop) => (
                <CarouselItem key={barbershop.id} className="basis-1/1">
                  <Barber />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <div className="px-5 mt-6">
        <header className="flex items-center justify-between  mb-3">
          <h2 className="text-xs uppercase text-gray-400 font-bold">
            Serviços
          </h2>
          <Link href="/barbers" className="text-xs text-primary">
            Ver todos
          </Link>
        </header>
        <div className="w-full flex items-center justify-center">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {barbershops.map((barbershop) => (
                <CarouselItem key={barbershop.id} className="basis-1/1">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* <div className="px-5 mt-6">
        <header className="flex items-center justify-between mb-3">
          <h2 className="text-xs uppercase text-gray-400 font-bold">
            Serviços
          </h2>
          <Link href="/services" className="text-xs text-primary">
            Ver todos
          </Link>
        </header>
        <div className="w-full flex items-center justify-center">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {serializedBarbershop.services.map((service) => (
                <CarouselItem key={barbershop.id} className="basis-1/1">
                  <ServiceItem
                    barbershop={serializedBarbershop}
                    service={service}
                    isAuthenticated={!!session?.user?.name}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div> */}
    </main>
  );
}
