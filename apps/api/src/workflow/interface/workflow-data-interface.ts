import { BotConfigDto } from 'src/bot-config/dto/bot-config.dto';
import { PullRequestFileDto } from 'src/github/dto/github-pull-request-file.dto';

export interface WorkflowDataInterface {
  pullRequestFiles: PullRequestFileDto[];
  botConfig: BotConfigDto;
}
