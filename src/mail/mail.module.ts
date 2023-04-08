import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TaskQueueService } from '../task-queue/task-queue.service';
import { TaskQueueModule } from '../task-queue/task-queue.module';
import { EmailQueueProducer } from '../task-queue/producer/email-queue.producer';
import { PrismaService } from '../prisma.service';

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
  providers: [MailService, TaskQueueService, EmailQueueProducer, PrismaService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
