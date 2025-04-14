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
  pullRequests: {
    path: '/pull-requests',
    icon: GitPullRequest,
    name: 'pullRequests',
  },
  reviews: {
    path: '/reviews',
    icon: Code2,
    name: 'reviews',
  },
  files: {
    path: '/files',
    icon: FileCode2,
    name: 'files',
  },
  integrations: {
    path: '/integrations',
    icon: Link,
    name: 'integrations',
  },
  settings: {
    path: '/settings',
    icon: Settings2,
    name: 'settings',
  },
  help: {
    path: 'https://docs.angrybeardbot.com',
    icon: HelpCircle,
    name: 'help',
  },
};
