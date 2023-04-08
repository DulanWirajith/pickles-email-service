import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TaskQueueService } from '../task-queue/task-queue.service';
import { TaskQueueModule } from '../task-queue/task-queue.module';
import { EmailQueueProducer } from '../task-queue/producer/email-queue.producer';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        secure: false,
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TaskQueueModule,
  ],
  providers: [MailService, TaskQueueService, EmailQueueProducer],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
