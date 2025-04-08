import { Module } from '@nestjs/common';
import { BotConfigService } from './bot-config.service';
import { BotConfigController } from './bot-config.controller';

@Module({
  providers: [BotConfigService],
  controllers: [BotConfigController]
})
export class BotConfigModule {}
