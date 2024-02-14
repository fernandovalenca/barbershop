'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Barbershop from '@/core/domain/entities/barbershop';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type BarbershopItemProps = {
  barbershop: Barbershop;
};

export default function BarbershopItem({ barbershop }: BarbershopItemProps) {
  const router = useRouter();
  const handleBarbershopClick = () =>
    router.push(`/barbershops/${barbershop.id}`);

  return (
    <Card className="max-w-44 min-w-44 rounded-2xl hover:border hover:border-primary">
      <CardContent className="p-0">
        <div className="relative p-1">
          <Badge
            variant="secondary"
            className="flex gap-1 absolute top-2 left-2 opacity-90"
          >
            <StarIcon className="fill-primary text-primary" size={12} />
            <span className="text-xs">5,0</span>
          </Badge>
          <Image
            alt={barbershop.name}
            src={barbershop.imageUrl}
            height={0}
            width={0}
            sizes="100vw"
            className="h-40 w-full object-cover rounded-2xl"
          />
        </div>
        <div className="p-2">
          <h2 className="text-base font-bold overflow-x-hidden text-ellipsis text-nowrap">
            {barbershop.name}
          </h2>
          <p className="text-xs text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>
          <Button
            className="w-full mt-3 hover:bg-primary"
            variant="secondary"
            onClick={handleBarbershopClick}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
