import { BotConfigDto } from 'src/bot-config/dto/bot-config.dto';

export interface RepositoryDto {
  id?: string;
  name: string;
  url: string;
  language?: string;
  hasWiki?: boolean;
  githubId?: string;
  botConfig?: BotConfigDto;
}
