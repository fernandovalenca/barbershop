'use client';

import {
  CalendarDays,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from 'lucide-react';
import Icon from '../icons/logo';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import Link from 'next/link';

export default function Header() {
  const { data, status } = useSession();
  const logout = () => signOut();
  const login = () => signIn('google');

  return (
    <header>
      <Card className="rounded-none">
        <CardContent className="flex flex-row justify-between items-center px-5 py-6">
          <Icon />
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-transparent outline-none" size="icon">
                <MenuIcon size={18} />
              </Button>
            </SheetTrigger>

            <SheetContent className="p-0">
              <SheetHeader className="p-5 text-left border-b border-secondary">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              {status === 'authenticated' ? (
                <div className="flex justify-between items-center px-5 py-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={data.user?.image ?? ''}
                        alt={data.user?.name ?? ''}
                      />
                      <AvatarFallback className="w-full flex items-center justify-center">
                        {data.user?.name?.charAt(0) ?? ''}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-base">{data.user?.name}</h2>
                  </div>
                  <Button onClick={logout} variant={'secondary'} size={'icon'}>
                    <LogOutIcon size={18} />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col px-5 py-6 gap-3">
                  <div className="flex items-center gap-3">
                    <UserIcon size={24} className="text-gray-400" />
                    <h2 className="text-base">Olá, faça seu login!</h2>
                  </div>

                  <Button
                    onClick={login}
                    variant={'secondary'}
                    className="flex justify-start items-center gap-3"
                  >
                    <LogInIcon size={18} />
                    <span className="text-sm">Fazer login</span>
                  </Button>
                </div>
              )}

              <div className="w-full flex flex-col gap-3 px-5">
                <Button
                  className="flex gap-2 items-center justify-start"
                  variant={'outline'}
                  asChild
                >
                  <Link href="/">
                    <HomeIcon size={16} />
                    Início
                  </Link>
                </Button>
                {status === 'authenticated' && (
                  <Button
                    className="flex gap-2 items-center justify-start"
                    variant={'outline'}
                    asChild
                  >
                    <Link href="/bookings">
                      <CalendarDays size={16} />
                      Agendamentos
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
}
