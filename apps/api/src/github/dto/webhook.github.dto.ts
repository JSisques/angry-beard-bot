export interface GithubUser {
  login: string;
  id: string;
  node_id?: string;
  avatar_url: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  type: string;
  site_admin?: boolean;
}

export interface GithubRepository {
  id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GithubUser;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  size: number;
  language: string;
  default_branch: string;
}

export interface GithubPullRequestRef {
  label: string;
  ref: string;
  sha: string;
  user: GithubUser;
  repo: GithubRepository;
}

export interface GithubPullRequest {
  url: string;
  id: string;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  number: number;
  state: string;
  locked: boolean;
  title: string;
  user: GithubUser;
  body: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  merge_commit_sha: string;
  assignee: any | null;
  assignees: any[];
  requested_reviewers: any[];
  requested_teams: any[];
  labels: any[];
  milestone: any | null;
  draft: boolean;
  head: GithubPullRequestRef;
  base: GithubPullRequestRef;
  merged: boolean;
  mergeable: boolean | null;
  rebaseable: boolean | null;
  mergeable_state: string;
  merged_by: any | null;
  comments: number;
  review_comments: number;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}

export interface GithubInstallation {
  id: string;
  node_id: string;
}

export interface GithubWebhookDto {
  action: string;
  number: number;
  pull_request: GithubPullRequest;
  repository: GithubRepository;
  sender: GithubUser;
  installation: GithubInstallation;
}
