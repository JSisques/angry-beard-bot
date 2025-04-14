'use client';

import React, { useState } from 'react';
import { AppSidebarProps } from './AppSidebar.interface';
import logo from '@/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';

const AppSidebar = ({ dictionary, user }: AppSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Mobile menu button */}
      <button className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md" onClick={() => setIsOpen(!isOpen)}>
        <span className="sr-only">Open menu</span>
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed md:relative h-full bg-white shadow-lg transition-all duration-300 ease-in-out',
          'flex-shrink-0',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          isCollapsed ? 'w-16' : 'w-64',
        )}
      >
        <div className="p-4 flex flex-col h-full">
          <Link
            href="/"
            className={cn(
              'mt-auto border-gray-200 mb-8 border-b rounded-md',
              'flex items-center gap-3 p-2 hover:bg-gray-100 transition-colors',
              isCollapsed ? 'justify-center' : 'justify-start',
            )}
          >
            <div className="h-8 w-8 flex items-center justify-center flex-shrink-0">
              <Image src={logo} alt="logo" width={32} height={32} />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate">{dictionary.common.appName}</span>
              </div>
            )}
          </Link>

          <nav className="space-y-2 flex-1">
            {Object.values(routes).map((route, index) => {
              const isActive = pathname === route.path;
              const Icon = route.icon;
              const routeName = route.name || '';

              return (
                <Link
                  key={index}
                  href={route.path}
                  className={cn(
                    'flex items-center p-2 rounded-md transition-colors',
                    isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100',
                    isCollapsed ? 'justify-center' : 'justify-start',
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && <span className="ml-3">{dictionary.sidebar[routeName]}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <Link
            href="/"
            className={cn(
              'mt-auto pt-4 border-t border-gray-200',
              'flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors',
              isCollapsed ? 'justify-center' : 'justify-start',
            )}
          >
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <Image className="rounded-full" src={user?.user_metadata.avatar_url} alt="avatar" width={32} height={32} />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate">{user?.user_metadata.full_name}</span>
                <span className="text-xs text-gray-500 truncate">{user?.user_metadata.email}</span>
              </div>
            )}
          </Link>
        </div>

        {/* Toggle button */}
        <button
          className={cn(
            'hidden md:flex absolute top-1/2 -translate-y-1/2 bg-white',
            'items-center justify-center h-8 w-8',
            'rounded-full shadow-md hover:bg-gray-50 transition-colors',
            'border border-gray-200',
            isCollapsed ? '-right-4' : '-right-4',
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

export default AppSidebar;
