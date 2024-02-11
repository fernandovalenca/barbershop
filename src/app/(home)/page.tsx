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

      <div className='px-5 mt-6'>
        <Search />
      </div>
    </main>
  );
}
