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
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
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
      isActive: true,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src={theme === 'dark' ? '/icon_white.svg' : '/icon_black.svg'} alt="Angry Beard Bot" width={32} height={32} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Angry Beard Bot</span>
                  <span className="truncate text-xs">Code Review Expert</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
