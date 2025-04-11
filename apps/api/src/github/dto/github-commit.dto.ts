export interface GithubCommitAuthor {
  name: string;
  email: string;
  date: string;
}

export interface GithubCommitTree {
  sha: string;
  url: string;
}

export interface GithubCommitVerification {
  verified: boolean;
  reason: string;
  signature: string;
  payload: string;
  verified_at: string;
}

export interface GithubCommitDetails {
  author: GithubCommitAuthor;
  committer: GithubCommitAuthor;
  message: string;
  tree: GithubCommitTree;
  url: string;
  comment_count: number;
  verification: GithubCommitVerification;
}

export interface GithubCommitUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}

export interface GithubCommitParent {
  sha: string;
  url: string;
  html_url: string;
}

export interface GithubCommit {
  sha: string;
  node_id: string;
  commit: GithubCommitDetails;
  url: string;
  html_url: string;
  comments_url: string;
  author: GithubCommitUser;
  committer: GithubCommitUser;
  parents: GithubCommitParent[];
}
