import { Inter } from 'next/font/google';
import './globals.css';

import { Metadata } from 'next';
import Loading from './loading';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Angry Beard Bot',
  description: 'AI-powered code review bot with personality',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
