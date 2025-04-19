import { Test, TestingModule } from '@nestjs/testing';
import { BotConfigController } from './bot-config.controller';

describe('BotConfigController', () => {
  let controller: BotConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotConfigController],
    }).compile();

    controller = module.get<BotConfigController>(BotConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
