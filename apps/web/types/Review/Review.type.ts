export type Review = {
  id: string;
  userId: string;
  comment: string;
  source: string | null;
  githubCommentId: number;
  filename: string;
  patch: string;
  creditsUsed: number;
  pullRequestId: string;
  createdAt: string;
  updatedAt: string;
};
