'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Barbershop from '@/core/domain/entities/barbershop';
import { ChevronLeft, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type BarbershopInfoProps = {
  barbershop: Barbershop;
};

export default function BarbershopInfo({ barbershop }: BarbershopInfoProps) {
  const router = useRouter();
  const handleBackClick = () => router.push("/");
  return (
    <div>
      <div className="relative">
        <Button
          variant={'outline'}
          size={'icon'}
          className="z-10 absolute left-5 top-6 hover:bg-primary active:bg-primary"
          onClick={handleBackClick}
        >
          <ChevronLeft size={18} />
        </Button>
        <Button
          variant={'outline'}
          size={'icon'}
          className="z-10 absolute right-5 top-6 hover:bg-primary active:bg-primary"
        >
          <MenuIcon size={18} />
        </Button>
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          height={0}
          width={0}
          sizes="100vw"
          className="opacity-75 h-64 w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 px-5 mt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-semibold">{barbershop.name}</h1>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 items-center">
            <MapPinIcon size={16} className="text-primary" />
            <p className="text-sm">{barbershop.address}</p>
          </div>
          <div className="flex gap-1 items-center">
            <StarIcon size={16} className="text-primary" />
            <p className="text-sm">5,0 (899 avaliações)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
