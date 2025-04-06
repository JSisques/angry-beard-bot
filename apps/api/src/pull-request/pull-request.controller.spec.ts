import { Test, TestingModule } from '@nestjs/testing';
import { PullRequestController } from './pull-request.controller';

describe('PullRequestController', () => {
  let controller: PullRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PullRequestController],
    }).compile();

    controller = module.get<PullRequestController>(PullRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
