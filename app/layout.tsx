import './globals.css';

import { Inter } from 'next/font/google';

import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import type { Metadata } from 'next';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserID from '@/actions/getSongsByUserID';
import Player from '@/components/Player';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Audio Hub: The Reality Streamer',
  description: 'Listen to awesome music from anywhere in the world!',
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserID();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
