export interface GithubWebhookDto {
  action: string;
  number: number;
  pull_request: {
    url: string;
    id: number;
    node_id: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    number: number;
    state: string;
    locked: boolean;
    title: string;
    user: {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      type: string;
      site_admin: boolean;
    };
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
    head: {
      label: string;
      ref: string;
      sha: string;
      user: {
        login: string;
        id: number;
        avatar_url: string;
        type: string;
      };
      repo: {
        id: number;
        name: string;
        full_name: string;
        private: boolean;
        owner: {
          login: string;
          id: number;
          avatar_url: string;
          type: string;
        };
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
      };
    };
    base: {
      label: string;
      ref: string;
      sha: string;
      user: {
        login: string;
        id: number;
        avatar_url: string;
        type: string;
      };
      repo: {
        id: number;
        name: string;
        full_name: string;
        private: boolean;
        owner: {
          login: string;
          id: number;
          avatar_url: string;
          type: string;
        };
      };
    };
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
  };
  repository: {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
      login: string;
      id: number;
      avatar_url: string;
      type: string;
    };
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
  };
  sender: {
    login: string;
    id: number;
    avatar_url: string;
    type: string;
  };
  installation: {
    id: number;
    node_id: string;
  };
}
