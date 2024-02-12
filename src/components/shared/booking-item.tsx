import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

export default function BookingCard() {
  return (
    <Card className="p-0">
      <CardContent className="flex justify-between items-center p-0">
        <div className="flex flex-col p-3 gap-2">
          <Badge className="bg-[#221C3D] text-primary w-fit text-xs hover:bg-[#221C3D] ">
            Confirmado
          </Badge>
          <h1 className="text-base">Corte de cabelo</h1>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
              <AvatarFallback>VB</AvatarFallback>
            </Avatar>
            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className="flex p-6 flex-col items-center justify-center border-l border-solid border-secondary">
          <p className="capitalize text-xs">Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-xs">09:45</p>
        </div>
      </CardContent>
    </Card>
  );
}
