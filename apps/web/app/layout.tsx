import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MobileNav } from '@/components/mobile-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Angry Beard Bot',
  description: 'AI-powered code review bot with personality',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <div className="hidden lg:block">
              <AppSidebar />
            </div>
            <MobileNav />
            <main className="w-full pt-14 lg:pt-0">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
