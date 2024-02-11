import BookingCard from '@/components/shared/booking-item';
import Header from '@/components/shared/header';
import Search from '@/components/shared/search';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Home() {
  const currentDate = format(new Date(), "EEEE',' d 'de' MMMM", {
    locale: ptBR,
  });
  return (
    <main>
      <Header />

      <div className="px-5 pt-5">
        <h1 className="text-xl font-bold">Olá, Fernando</h1>
        <p className="text-sm">
          {currentDate.charAt(0).toUpperCase() + currentDate.slice(1)}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
          Agendamentos
        </h2>
        <BookingCard />
      </div>
    </main>
  );
}
