import { PullRequestStatus } from '@prisma/client';

export interface PullRequestDto {
  id?: string;
  title?: string;
  body?: string;
  url?: string;
  htmlUrl?: string;
  diffUrl?: string;
  patchUrl?: string;
  issueUrl?: string;
  commitsUrl?: string;
  reviewCommentsUrl?: string;
  commentsUrl?: string;
  statusesUrl?: string;
  isMerged?: boolean;
  isMergeable?: boolean;
  isRebaseable?: boolean;
  number?: number;
  state?: string;
  commits?: number;
  additions?: number;
  deletions?: number;
  changedFiles?: number;
  isDraft?: boolean;
  githubId?: string;
  repositoryId: string;
  status?: PullRequestStatus;
  mergedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
