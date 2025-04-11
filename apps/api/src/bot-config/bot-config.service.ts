import { Injectable, Logger } from '@nestjs/common';
import { BotConfigDto } from './dto/bot-config.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BotConfigService {
  private readonly logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(BotConfigService.name);
  }

  async getBotConfigByUserId(userId: string): Promise<BotConfigDto> {
    this.logger.debug(`Getting bot config for userId: ${userId}`);
    const botConfig = await this.prisma.botConfig.findUnique({ where: { userId } });
    this.logger.debug(`Bot config: ${JSON.stringify(botConfig)}`);
    return botConfig;
  }
}
