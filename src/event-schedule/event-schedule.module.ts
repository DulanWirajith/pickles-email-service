import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { EventScheduleController } from './event-schedule.controller';
import { EventScheduleService } from './event-schedule.service';

@Module({
  imports: [EventEmitterModule.forRoot(), ScheduleModule.forRoot()],
  controllers: [EventScheduleController],
  providers: [EventScheduleService],
})
export class EventScheduleModule {}
