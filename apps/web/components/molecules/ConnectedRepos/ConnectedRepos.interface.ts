import { RootProps } from '@/interfaces/Root/Root.interface';

interface Repository {
  id: string;
  name: string;
  owner: string;
  isPrivate: boolean;
  lastReviewDate?: string;
}

export interface ConnectedReposProps extends RootProps {
  repositories: Repository[];
}
