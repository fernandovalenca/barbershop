import Header from '@/components/shared/header';
import Search from '@/components/shared/search';
import { db } from '@/lib/prisma';
import BarbershopItem from '../(home)/_component/barbershop-item';
import { redirect } from 'next/navigation';

type BarbershopPageParams = {
  searchParams: {
    search: string;
  };
};

export default async function BarbershopPage({
  searchParams,
}: BarbershopPageParams) {
  if (!searchParams.search) redirect('/');
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
  });

  return (
    <main className="flex flex-col gap-6">
      <Header />
      <div className="px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="text-xs font-semibold text-gray-400 uppercase">
          Resultados para &quot;{searchParams.search}&quot;
        </h2>
        <div className="mt-3 gap-3 grid grid-cols-2 justify-around place-items-center">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </main>
  );
}
