import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './util/logger.middleware';
import { MailModule } from './mail/mail.module';
import { TaskQueueModule } from './task-queue/task-queue.module';
import { EventScheduleModule } from './event-schedule/event-schedule.module';

@Module({
  imports: [
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        SENTRY_DSN: Joi.string().required(),
        EMAIL_HOST: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.string().required(),
        PUSHER_APP_ID: Joi.string().required(),
        PUSHER_APP_KEY: Joi.string().required(),
        PUSHER_APP_SECRET: Joi.string().required(),
        PUSHER_APP_CLUSTER: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_EMAIL_SEND_REQUEST_QUEUE: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
    TaskQueueModule,
    EventScheduleModule,
    RmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
