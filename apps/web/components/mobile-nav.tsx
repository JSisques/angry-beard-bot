'use client';

import * as React from 'react';
import {
  Bot,
  Code2,
  FileCode2,
  GitPullRequest,
  HelpCircle,
  Settings2,
  User,
  AlertTriangle,
  CheckCircle,
  FileText,
  GitBranch,
  History,
  Star,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const data = {
  user: {
    name: 'Angry Beard Bot',
    email: 'beard@angrybot.com',
    avatar: '/avatars/angry-beard.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: Bot,
    },
    {
      title: 'Pull Requests',
      url: '/pull-requests',
      icon: GitPullRequest,
    },
    {
      title: 'Code Reviews',
      url: '/reviews',
      icon: Code2,
    },
    {
      title: 'Personality',
      url: '/personality',
      icon: User,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: 'Documentation',
      url: '/docs',
      icon: FileCode2,
    },
    {
      title: 'Support',
      url: '/support',
      icon: HelpCircle,
    },
  ],
};

export function MobileNav() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex flex-col bg-background lg:hidden">
      {/* Header */}
      <div className="flex w-full items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Image src={theme === 'dark' ? '/icon_white.svg' : '/icon_black.svg'} alt="Angry Beard Bot" width={32} height={32} />
          </div>
          <span className="font-medium">Angry Beard Bot</span>
        </div>

        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Menu */}
      <div className={cn('overflow-hidden transition-all duration-200 ease-in-out', isOpen ? 'max-h-screen' : 'max-h-0')}>
        <div className="flex flex-col divide-y">
          {/* Main Navigation */}
          <div className="flex flex-col">
            {data.navMain.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.url}
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 text-sm transition-colors',
                    pathname === item.url ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'hover:bg-accent',
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* Secondary Navigation */}
          <div className="flex flex-col">
            {data.navSecondary.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.url}
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 text-sm transition-colors',
                    pathname === item.url ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'hover:bg-accent',
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 p-4">
            <div className="relative aspect-square size-8 overflow-hidden rounded-full">
              <Image src={data.user.avatar} alt={data.user.name} fill className="object-cover" />
            </div>
            <div className="grid flex-1 text-sm leading-tight">
              <span className="font-medium">{data.user.name}</span>
              <span className="text-xs text-muted-foreground">{data.user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
