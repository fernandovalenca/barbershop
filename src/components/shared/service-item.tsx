'use client';

import Service from '@/core/domain/entities/service';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';

type ServiceItemProps = {
  service: Service;
  isAuthenticated: boolean;
};

export default function ServiceItem({
  service,
  isAuthenticated,
}: ServiceItemProps) {
  const handleBookingClick = () => {
    if (!isAuthenticated) {
      signIn('google');
    }
  };

  return (
    <Card className="w-full min-h-[134px] max-h-[134px] hover:border hover:border-primary">
      <CardContent className="flex gap-3 p-3">
        <Image
          alt={service.name}
          src={service.imageUrl}
          height={0}
          width={0}
          sizes="100vw"
          className="w-[110px] h-[110px] object-cover rounded-2xl"
        />
        <div>
          <h2 className="font-semibold text-sm">{service.name}</h2>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-semibold text-primary">
              {Intl.NumberFormat('pt-BR', {
                currency: 'BRL',
                style: 'currency',
              }).format(service.price)}
            </span>
            <Button
              onClick={handleBookingClick}
              variant={'secondary'}
              className="hover:bg-primary"
            >
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
