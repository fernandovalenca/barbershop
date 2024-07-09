'use client';

import Barbershop from '@/domain/entities/barbershop';
import Service from '@/domain/entities/service';
import cancelBooking from '@/services/cancel-booking';
import { Booking } from '@prisma/client';
import { format, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Loader2, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../ui/sheet';

type BookingItemProps = {
  booking: Booking & { service: Service; barbershop: Barbershop };
};

export default function BookingCard({ booking }: BookingItemProps) {
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const isBookingFinished = isPast(booking.date);

  const submitCancelBooking = async () => {
    setSubmitIsLoading(true);
    if (isBookingFinished) return;
    try {
      await cancelBooking(booking.id);
      setSheetIsOpen(false);
      toast.success('Reserva cancelada com sucesso', {
        duration: 3000,
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setSubmitIsLoading(false);
    }
  };

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Card className="p-0">
          <CardContent className="flex justify-between items-center p-0">
            <div className="flex flex-col p-3 gap-2">
              <Badge
                variant={isBookingFinished ? 'secondary' : 'default'}
                className="w-fit text-xs"
              >
                {isBookingFinished ? 'Finalizado' : 'Confirmado'}
              </Badge>
              <h1 className="text-base">{booking.service.name}</h1>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback className="w-full flex items-center justify-center">
                    {booking.barbershop.name.charAt(0) ?? ''}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex p-6 flex-col items-center justify-center border-l border-solid border-secondary">
              <p className="capitalize text-xs">
                {format(booking.date, 'MMMM', { locale: ptBR })}
              </p>
              <p className="text-2xl">{format(booking.date, 'dd')}</p>
              <p className="text-xs">
                {format(booking.date, 'HH:mm', { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="p-5 text-left border-b border-secondary">
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="relative px-5 mt-2">
          <Image
            quality={50}
            src="/assets/images/bg-maps.jpg"
            alt={`Mapa de localização da ${booking.barbershop.name}`}
            height={0}
            width={0}
            sizes="100vw"
            className="w-full h-48 object-cover rounded-lg"
          />

          <div className="absolute w-full bottom-2 left-0 px-9">
            <Card className="">
              <CardContent className="p-3 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={booking.barbershop.imageUrl}
                    alt={booking.barbershop.name}
                  />
                  <AvatarFallback className="w-full">
                    {booking.barbershop.name.charAt(0) ?? ''}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <h2 className="text-base font-semibold text-nowrap text-ellipsis overflow-hidden">
                    {booking.barbershop.name}
                  </h2>
                  <span className="text-xs text-nowrap text-ellipsis overflow-hidden">
                    {booking.barbershop.address}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-5">
          <Badge
            variant={isBookingFinished ? 'secondary' : 'default'}
            className="w-fit text-xs"
          >
            {isBookingFinished ? 'Finalizado' : 'Confirmado'}
          </Badge>

          <Card className="">
            <CardContent className="p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="flex-1 text-start text-base font-semibold overflow-hidden text-nowrap text-ellipsis">
                  {booking.service.name}
                </h2>
                <span className="text-base font-semibold">
                  {Intl.NumberFormat('pt-BR', {
                    currency: 'BRL',
                    style: 'currency',
                  }).format(booking.service.price)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <span className="text-sm text-gray-400">
                  {format(booking.date, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <span className="text-sm text-gray-400">
                  {format(booking.date, 'HH:mm')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="flex-1 text-sm text-gray-400">Barbearia</h2>
                <span className="flex-1 text-end text-sm text-gray-400 overflow-hidden text-nowrap text-ellipsis">
                  {booking.barbershop.name}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-2 px-5 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone size={20} />
              <span className="text-sm">{booking.barbershop.phone}</span>
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

        <SheetFooter className="p-5 pb-6 flex flex-1">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={isBookingFinished || submitIsLoading}
                className=""
                variant="destructive"
              >
                Cancelar reserva
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90%]">
              <AlertDialogHeader>
                <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja cancelar esse agendamento?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-row gap-3">
                <AlertDialogCancel className="m-0 w-full">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={submitIsLoading}
                  onClick={submitCancelBooking}
                  className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 border-destructive hover:border-destructive/90"
                >
                  {submitIsLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
