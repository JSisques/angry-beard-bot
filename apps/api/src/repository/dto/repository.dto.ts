export interface RepositoryDto {
  id?: string;
  name: string;
  url: string;
  language?: string;
  hasWiki?: boolean;
  githubId?: string;
  botConfigId?: string;
}
