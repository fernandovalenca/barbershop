import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function Barber() {
  return (
    <Card className="flex items-center justify-center rounded hover:border hover:border-primary">
      <CardContent className="flex gap-2 items-center justify-center p-3">
        <Avatar className="h-6 w-6">
          <AvatarImage src="https://unsplash.com/pt-br/fotografias/homem-na-camisa-vermelha-com-cabelo-encaracolado-castanho-3rgm22SpNJU" />
          <AvatarFallback className="w-full flex items-center justify-center text-xs">
            FV
          </AvatarFallback>
        </Avatar>
        <div>
          <h1>Fernando Valença</h1>
        </div>
      </CardContent>
    </Card>
  );
}
