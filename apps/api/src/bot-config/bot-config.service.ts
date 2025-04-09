import { Injectable, Logger } from '@nestjs/common';
import { BotConfigDto } from './dto/bot-config.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BotConfigService {
  private readonly logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(BotConfigService.name);
  }

  async getBotConfigByRepositoryId(repositoryId: string): Promise<BotConfigDto> {
    this.logger.debug(`Getting bot config for repositoryId: ${repositoryId}`);
    const botConfig = await this.prisma.botConfig.findUnique({ where: { repositoryId } });
    this.logger.debug(`Bot config: ${JSON.stringify(botConfig)}`);
    return botConfig;
  }
}
