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
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  user_view_type?: string;
}

export interface GithubRepository {
  id: string;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GithubUser;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  language: string | null;
  default_branch: string;
  forks_url?: string;
  keys_url?: string;
  collaborators_url?: string;
  teams_url?: string;
  hooks_url?: string;
  issue_events_url?: string;
  events_url?: string;
  assignees_url?: string;
  branches_url?: string;
  tags_url?: string;
  blobs_url?: string;
  git_tags_url?: string;
  git_refs_url?: string;
  trees_url?: string;
  statuses_url?: string;
  languages_url?: string;
  stargazers_url?: string;
  contributors_url?: string;
  subscribers_url?: string;
  subscription_url?: string;
  commits_url?: string;
  git_commits_url?: string;
  comments_url?: string;
  issue_comment_url?: string;
  contents_url?: string;
  compare_url?: string;
  merges_url?: string;
  archive_url?: string;
  downloads_url?: string;
  issues_url?: string;
  pulls_url?: string;
  milestones_url?: string;
  notifications_url?: string;
  labels_url?: string;
  releases_url?: string;
  deployments_url?: string;
  stargazers_count?: number;
  watchers_count?: number;
  has_issues?: boolean;
  has_projects?: boolean;
  has_downloads?: boolean;
  has_wiki?: boolean;
  has_pages?: boolean;
  has_discussions?: boolean;
  forks_count?: number;
  mirror_url?: string | null;
  archived?: boolean;
  disabled?: boolean;
  open_issues_count?: number;
  license?: any | null;
  allow_forking?: boolean;
  is_template?: boolean;
  web_commit_signoff_required?: boolean;
  topics?: string[];
  visibility?: string;
  forks?: number;
  open_issues?: number;
  watchers?: number;
  allow_squash_merge?: boolean;
  allow_merge_commit?: boolean;
  allow_rebase_merge?: boolean;
  allow_auto_merge?: boolean;
  delete_branch_on_merge?: boolean;
  allow_update_branch?: boolean;
  use_squash_pr_title_as_default?: boolean;
  squash_merge_commit_message?: string;
  squash_merge_commit_title?: string;
  merge_commit_message?: string;
  merge_commit_title?: string;
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
  body: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  merge_commit_sha: string | null;
  assignee: any | null;
  assignees: any[];
  requested_reviewers: any[];
  requested_teams: any[];
  labels: any[];
  milestone: any | null;
  draft: boolean;
  head: GithubPullRequestRef;
  base: GithubPullRequestRef;
  _links?: {
    self: { href: string };
    html: { href: string };
    issue: { href: string };
    comments: { href: string };
    review_comments: { href: string };
    review_comment: { href: string };
    commits: { href: string };
    statuses: { href: string };
  };
  author_association?: string;
  auto_merge?: any | null;
  active_lock_reason?: any | null;
  merged?: boolean;
  mergeable?: boolean | null;
  rebaseable?: boolean | null;
  mergeable_state?: string;
  merged_by?: any | null;
  comments?: number;
  review_comments?: number;
  commits?: number;
  additions?: number;
  deletions?: number;
  changed_files?: number;
}

export interface GithubReview {
  id: number;
  node_id: string;
  user: GithubUser;
  body: string | null;
  commit_id: string;
  submitted_at: string;
  state: string;
  html_url: string;
  pull_request_url: string;
  author_association: string;
  _links: {
    html: { href: string };
    pull_request: { href: string };
  };
}

export interface GithubInstallation {
  id: string;
  node_id: string;
}

export interface GithubWebhookDto {
  action: string;
  review?: GithubReview;
  pull_request?: GithubPullRequest;
  repository: GithubRepository;
  sender: GithubUser;
  installation: GithubInstallation;
}
