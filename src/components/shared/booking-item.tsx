import { Booking } from '@prisma/client';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import Service from '@/core/domain/entities/service';
import Barbershop from '@/core/domain/entities/barbershop';
import { format, isPast } from 'date-fns';
import { pt, ptBR } from 'date-fns/locale';

type BookingItemProps = {
  booking: Booking & { service: Service; barbershop: Barbershop };
};

export default function BookingCard({ booking }: BookingItemProps) {
  const isBookingFinished = isPast(booking.date);

  return (
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
            {format(booking.date, 'hh:mm', { locale: ptBR })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
