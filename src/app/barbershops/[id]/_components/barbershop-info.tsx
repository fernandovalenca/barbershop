'use client';

import Image from 'next/image';
import Barbershop from '@/core/domain/entities/barbershop';
import { ChevronLeft, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SideMenu from '@/components/shared/side-menu';
import Link from 'next/link';

type BarbershopInfoProps = {
  barbershop: Barbershop;
};

export default function BarbershopInfo({ barbershop }: BarbershopInfoProps) {
  return (
    <div>
      <div className="relative">
        <Button
          variant={'outline'}
          size={'icon'}
          className="z-10 absolute left-5 top-6 active:bg-primary"
          asChild
        >
          <Link href="/">
            <ChevronLeft size={18} />
          </Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={'outline'}
              size={'icon'}
              className="z-10 absolute right-5 top-6 active:bg-primary"
            >
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>
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
