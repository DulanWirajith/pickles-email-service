import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { EventScheduleController } from './event-schedule.controller';
import { EventScheduleService } from './event-schedule.service';
import { PrismaService } from '../prisma.service';
import { TaskQueueService } from '../task-queue/task-queue.service';
import { EmailQueueProducer } from '../task-queue/producer/email-queue.producer';
import { TaskQueueModule } from '../task-queue/task-queue.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    TaskQueueModule,
  ],
  controllers: [EventScheduleController],
  providers: [
    EventScheduleService,
    PrismaService,
    TaskQueueService,
    EmailQueueProducer,
  ],
})
export class EventScheduleModule {}
