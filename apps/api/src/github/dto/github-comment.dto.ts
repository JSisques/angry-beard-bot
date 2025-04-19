export interface GithubCommentDto {
  body: string;
  commit_id: string;
  path: string;
  line: number;
}

interface GithubCommentUser {
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
  site_admin: boolean;
}

interface GithubCommentLinks {
  self: {
    href: string;
  };
  html: {
    href: string;
  };
  pull_request: {
    href: string;
  };
}

export interface GithubCommentOutputDto {
  url: string;
  pull_request_review_id: number;
  id: number;
  node_id: string;
  diff_hunk: string;
  path: string;
  position: number;
  original_position: number;
  commit_id: string;
  original_commit_id: string;
  in_reply_to_id: number;
  user: GithubCommentUser;
  body: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  pull_request_url: string;
  author_association: string;
  _links: GithubCommentLinks;
  start_line: number;
  original_start_line: number;
  start_side: string;
  line: number;
  original_line: number;
  side: string;
}
