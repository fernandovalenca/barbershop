import { db } from "@/lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import TabsNavigation from "./_components/tabs-navigation";

type BarbershopDetailsPageProps = {
  params: {
    id?: string;
  };
};

export default async function BarbershopDetailsPage({
  params,
}: BarbershopDetailsPageProps) {
  if (!params.id) return null;

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
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

  return (
    <main>
      <BarbershopInfo barbershop={serializedBarbershop} />

      <TabsNavigation
        defaultValue="services"
        barbershop={serializedBarbershop}
        services={serializedBarbershop.services}
      />
    </main>
  );
}
