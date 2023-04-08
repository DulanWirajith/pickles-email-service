import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskQueueController } from './task-queue.controller';
import { TaskQueueService } from './task-queue.service';
import { EMAIL_QUEUE } from './constants/task-queue-names.constant';
import { EmailQueueProducer } from './producer/email-queue.producer';
import { EmailQueueConsumer } from './consumer/email-queue.consumer';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: EMAIL_QUEUE,
    }),
  ],
  controllers: [TaskQueueController],
  providers: [
    TaskQueueService,
    EmailQueueProducer,
    EmailQueueConsumer,
    PrismaService,
  ],
  exports: [TaskQueueService, BullModule],
})
export class TaskQueueModule {}
