'use client';

import * as React from 'react';
import { Bot, Code2, FileCode2, GitPullRequest, HelpCircle, Link, Settings2, User } from 'lucide-react';
import NextLink from 'next/link';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import iconWhite from '@/public/icon_white.svg';
import iconBlack from '@/public/icon_black.svg';

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
              <NextLink href="/" className="flex items-center gap-2">
                <Image src={theme === 'dark' ? iconWhite : iconBlack} alt="Angry Beard Bot" width={32} height={32} priority />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Angry Beard Bot</span>
                  <span className="truncate text-xs">Code Review Expert</span>
                </div>
              </NextLink>
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
