'use client';

import ServiceItem from '@/components/shared/service-item';
import { Button } from '@/components/ui/button';
import Barbershop from '@/core/domain/entities/barbershop';
import Service from '@/core/domain/entities/service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { stat } from 'fs';
import { Smartphone } from 'lucide-react';
import { useSession } from 'next-auth/react';

type TabsNavigationProps = {
  services: Service[];
  barbershop: Barbershop;
  defaultValue: string;
};

const weekdays = [
  { day: 'Segunda-Feira', hours: '08:00 - 21:00' },
  { day: 'Terça-Feira', hours: '08:00 - 21:00' },
  { day: 'Quarta-Feira', hours: '08:00 - 21:00' },
  { day: 'Quinta-Feira', hours: '08:00 - 21:00' },
  { day: 'Sexta-Feira', hours: '08:00 - 21:00' },
  { day: 'Sábado', hours: '08:00 - 21:00' },
  { day: 'Domingo', hours: 'Fechado' },
];

export default function TabsNavigation({
  services,
  barbershop,
  defaultValue,
}: TabsNavigationProps) {
  const { status } = useSession();

  return (
    <Tabs defaultValue={defaultValue} className="flex flex-col pt-6 gap-6">
      <TabsList className="flex gap-3 px-5">
        <TabsTrigger
          className="data-[state=active]:bg-primary data-[state=active]:border-primary p-2 rounded-lg border border-secondary font-bold text-sm"
          value="services"
          asChild
        >
          <Button variant={'outline'}>Serviços</Button>
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary data-[state=active]:border-primary p-2 rounded-lg border border-secondary font-bold text-sm"
          value="information"
          asChild
        >
          <Button variant={'outline'}>Informações</Button>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="services">
        <section className="flex flex-col gap-3 px-5">
          {services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              barbershop={barbershop}
              isAuthenticated={status === 'authenticated'}
            />
          ))}
        </section>
      </TabsContent>
      <TabsContent value="information" className="">
        <div className="px-5 pb-6 border-b border-secondary">
          <h2 className="text-sm font-bold text-gray-400 uppercase">
            Sobre nós
          </h2>
          <p className="text-sm mt-3">
            Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa
            equipe de mestres barbeiros transforma cortes de cabelo e barbas em
            obras de arte. Em um ambiente acolhedor, promovemos confiança,
            estilo e uma comunidade unida.
          </p>
        </div>

        <div className="flex flex-col gap-2 px-5 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone size={20} />
              <span className="text-sm">(11) 9999-9999</span>
            </div>
            <Button
              size={'sm'}
              variant={'secondary'}
              className="hover:bg-primary"
            >
              Copiar
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone size={20} />
              <span className="text-sm">(11) 9999-9999</span>
            </div>
            <Button
              size={'sm'}
              variant={'secondary'}
              className="hover:bg-primary"
            >
              Copiar
            </Button>
          </div>
        </div>

        <div className="flex flex-col w-full gap-2 pt-6 border-t border-secondary px-5">
          {weekdays.map((weekday) => (
            <div
              key={weekday.day}
              className="flex justify-between items-center"
            >
              <span className="text-sm text-gray-400">{weekday.day}</span>
              <span className="text-sm">{weekday.hours}</span>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
