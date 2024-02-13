'use client';

import Service from '@/core/domain/entities/service';
import { Card, CardContent, CardHeader } from '../ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { useMemo, useState } from 'react';
import { Calendar } from '../ui/calendar';
import { ptBR } from 'date-fns/locale/pt-BR';
import { generateDayTimeList } from '@/helpers/generateDayTimeList';
import { format } from 'date-fns';
import { Barbershop } from '@prisma/client';

type ServiceItemProps = {
  service: Service;
  barbershop: Barbershop;
  isAuthenticated: boolean;
};

export default function ServiceItem({
  service,
  barbershop,
  isAuthenticated,
}: ServiceItemProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [hour, setHour] = useState<string | undefined>();

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      signIn('google');
    }
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const dateList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

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
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  onClick={handleBookingClick}
                  variant={'secondary'}
                  className="hover:bg-primary"
                >
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-1 flex-col p-0">
                <SheetHeader className="p-5 text-left border-b border-secondary">
                  <SheetTitle>Fazer reserva</SheetTitle>
                </SheetHeader>

                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateClick}
                  className="mt-6"
                  fromDate={new Date()}
                  locale={ptBR}
                  styles={{
                    head_cell: {
                      width: '100%',
                      textTransform: 'capitalize',
                    },
                    cell: {
                      width: '100%',
                    },
                    button: {
                      width: '100%',
                    },
                    nav_button_next: {
                      padding: '0.5rem',
                      width: 'fit-content',
                    },
                    nav_button_previous: {
                      padding: '0.5rem',
                      width: 'fit-content',
                    },
                    caption: {
                      textTransform: 'capitalize',
                    },
                  }}
                />

                {date && (
                  <div className="px-5 py-6 flex gap-3 overflow-x-auto border-y border-secondary [&::-webkit-scrollbar]:hidden">
                    {dateList.map((time) => (
                      <Button
                        key={time}
                        className="w-full rounded-full"
                        variant={hour === time ? 'default' : 'outline'}
                        onClick={() => handleHourClick(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                <div className="px-5 py-2">
                  <Card>
                    <CardContent className="p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h2 className="flex-1 text-start text-base font-semibold overflow-hidden text-nowrap text-ellipsis">
                          {service.name}
                        </h2>
                        <span className="text-base font-semibold">
                          {Intl.NumberFormat('pt-BR', {
                            currency: 'BRL',
                            style: 'currency',
                          }).format(service.price)}
                        </span>
                      </div>

                      {date && (
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Data</h2>
                          <span className="text-sm text-gray-400">
                            {format(date, "dd 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                      )}

                      {hour && (
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Horário</h2>
                          <span className="text-sm text-gray-400">{hour}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <h2 className="flex-1 text-sm text-gray-400">
                          Barbearia
                        </h2>
                        <span className="flex-1 text-end text-sm text-gray-400 overflow-hidden text-nowrap text-ellipsis">
                          {barbershop.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <SheetFooter className="flex flex-1 px-5 pb-6">
                  <Button
                    disabled={!hour || !date}
                  >
                    Confirmar reserva
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
