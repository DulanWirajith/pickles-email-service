import {
  BullQueueEvents,
  OnQueueActive,
  OnQueueEvent,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { EMAIL_QUEUE } from '../constants/task-queue-names.constant';
import { MailService } from '../../mail/mail.service';
import { MailSendDto } from '../../mail/dto/mail-send.dto';

@Processor(EMAIL_QUEUE)
export class EmailQueueConsumer {
  logger: Logger;
  constructor(private readonly mailService: MailService) {
    this.logger = new Logger(EmailQueueConsumer.name);
  }

  @Process()
  async sendEmail(job: Job<unknown>) {
    await this.mailService.sendTheMail(job.data as MailSendDto);
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(
      `Processing - Email Queue ID: ${job.id} with DATA: ${JSON.stringify(
        job.data,
      )}`,
    );
    // todo :when Event Run
  }

  @OnQueueEvent(BullQueueEvents.COMPLETED)
  onCompleted(job: Job) {
    this.logger.warn(
      `Completed - Email Queue ID ${job.id} with RESULT: ${
        job.returnvalue
      } and DATA: ${JSON.stringify(job)}`,
    );
    // todo :when Event Success
  }

  @OnQueueEvent(BullQueueEvents.FAILED)
  async onFail(job: Job) {
    this.logger.error(
      `Failed - Email Queue ID ${job.id} with RESULT: ${
        job.returnvalue
      } and DATA: ${JSON.stringify(job)}`,
    );
    // todo :when Event Failed
  }
}
