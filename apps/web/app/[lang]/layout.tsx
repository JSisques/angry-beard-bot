'use client';
import { Inter } from 'next/font/google';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MobileNav } from '@/components/mobile-nav';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.includes('/auth');

  return isAuthPage ? (
    <main className="w-full">{children}</main>
  ) : (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <MobileNav />
        <main className="w-full pt-14 lg:pt-0">{children}</main>
      </div>
    </SidebarProvider>
  );
}
