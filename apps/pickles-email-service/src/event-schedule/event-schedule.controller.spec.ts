import { Test, TestingModule } from '@nestjs/testing';
import { EventScheduleController } from './event-schedule.controller';

describe('EventScheduleController', () => {
  let controller: EventScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventScheduleController],
    }).compile();

    controller = module.get<EventScheduleController>(EventScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
