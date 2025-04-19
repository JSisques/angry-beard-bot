export interface PullRequestFileDto {
  pullRequestNumber: number;
  pullRequestUrl: string;
  sha: string;
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  blob_url: string;
  raw_url: string;
  contents_url: string;
  patch?: string;
  normalizedPatch?: NormalizedPatchDto[];
}

export interface NormalizedPatchDto {
  startLine: number;
  endLine: number;
  content: string;
}
