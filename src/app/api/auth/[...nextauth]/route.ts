import NextAuth, { AuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '@/lib/prisma';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
