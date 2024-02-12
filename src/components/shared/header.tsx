'use client';

import { MenuIcon } from 'lucide-react';
import Icon from '../icons/logo';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import SideMenu from './side-menu';

export default function Header() {
  return (
    <header>
      <Card className="rounded-none">
        <CardContent className="flex flex-row justify-between items-center px-5 py-6">
          <Icon />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={'outline'} size="icon" className='active:bg-primary'>
                <MenuIcon size={18} />
              </Button>
            </SheetTrigger>

            <SheetContent className="p-0">
              <SideMenu />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
}
