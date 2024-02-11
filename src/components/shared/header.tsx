import { MenuIcon } from 'lucide-react';
import Icon from '../icons/logo';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export default function Header() {
  return (
    <header>
      <Card className='rounded-none'>
        <CardContent className='flex flex-row justify-between items-center px-5 py-6'>
          <Icon />
          <Button className='bg-transparent outline-none' size="icon">
            <MenuIcon size={18} />
          </Button>
        </CardContent>
      </Card>
    </header>
  );
}
