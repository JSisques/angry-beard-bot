import '../styles/globals.css';

import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Loading from './loading';
import { Suspense } from 'react';
import { Providers } from './providers';
export const metadata: Metadata = {
  title: 'Angry Beard Bot',
  description: 'AI-powered code review bot with personality',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
