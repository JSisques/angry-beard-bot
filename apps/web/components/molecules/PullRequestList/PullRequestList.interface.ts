import { RootProps } from '@/interfaces/Root/Root.interface';

interface PullRequest {
  id: string;
  title: string;
  repository: string;
  status: 'open' | 'merged' | 'closed';
  createdAt: string;
}

export interface PullRequestListProps extends RootProps {
  pullRequests: PullRequest[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
