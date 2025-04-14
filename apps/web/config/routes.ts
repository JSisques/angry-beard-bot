import { Bot, Code2, FileCode2, GitPullRequest, HelpCircle, Home, Link, Settings2, User } from 'lucide-react';

export const routes = {
  home: {
    path: '/',
    icon: Home,
    name: 'home',
  },
  botSettings: {
    path: '/bot-settings',
    icon: Bot,
    name: 'botSettings',
  },
  settings: {
    path: '/settings',
    icon: Settings2,
    name: 'settings',
  },
  help: {
    path: '/help',
    icon: HelpCircle,
    name: 'help',
  },
  pullRequests: {
    path: '/pull-requests',
    icon: GitPullRequest,
    name: 'pullRequests',
  },
  code: {
    path: '/code',
    icon: Code2,
    name: 'code',
  },
  files: {
    path: '/files',
    icon: FileCode2,
    name: 'files',
  },
  profile: {
    path: '/profile',
    icon: User,
    name: 'profile',
  },
  integrations: {
    path: '/integrations',
    icon: Link,
    name: 'integrations',
  },
};
