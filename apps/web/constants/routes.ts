import { Bot, Code2, FileCode2, GitPullRequest, HelpCircle, Home, Link, Settings2, User } from 'lucide-react';

export const routes = {
  home: {
    path: '/',
    icon: Home,
    name: 'Home',
  },
  botSettings: {
    path: '/bot-settings',
    icon: Bot,
    name: 'Bot Settings',
  },
  settings: {
    path: '/settings',
    icon: Settings2,
    name: 'Settings',
  },
  help: {
    path: '/help',
    icon: HelpCircle,
    name: 'Help',
  },
  pullRequests: {
    path: '/pull-requests',
    icon: GitPullRequest,
  },
  code: {
    path: '/code',
    icon: Code2,
  },
  files: {
    path: '/files',
    icon: FileCode2,
  },
  profile: {
    path: '/profile',
    icon: User,
    name: 'Profile',
  },
  integrations: {
    path: '/integrations',
    icon: Link,
  },
};
