import { Test, TestingModule } from '@nestjs/testing';
import { TaskQueueController } from './task-queue.controller';

describe('TaskQueueController', () => {
  let controller: TaskQueueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskQueueController],
    }).compile();

    controller = module.get<TaskQueueController>(TaskQueueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
