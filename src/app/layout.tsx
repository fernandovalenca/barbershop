import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/shared/footer';
import NextAuthProvider from './_providers/next-auth-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Barber Booking - Agendamentos de barbearia',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="h-screen">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} dark h-full flex flex-col justify-between`}
      >
        <NextAuthProvider>{children}</NextAuthProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
