import './globals.css';

import { Inter } from 'next/font/google';

import type { Metadata } from 'next';
import Player from '@/components/Player';
import Sidebar from '@/components/Sidebar';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserID from '@/actions/getSongsByUserID';
import SupabaseProvider from '@/providers/SupabaseProvider';
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Audio Hub',
  description: 'Listen to awesome music from anywhere in the world!',
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserID();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
