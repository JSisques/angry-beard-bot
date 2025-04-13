export type PullRequest = {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'MERGED';
  githubId: string | null;
  repositoryId: string;
  repository: {
    id: string;
    name: string;
    url: string;
    language: string | null;
    hasWiki: boolean;
    githubId: string | null;
    ownerId: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
