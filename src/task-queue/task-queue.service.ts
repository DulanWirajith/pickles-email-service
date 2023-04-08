import { Injectable } from '@nestjs/common';
import { Email } from '@prisma/client';
import { MailSendDto } from '../mail/dto/mail-send.dto';
import { EmailQueueProducer } from './producer/email-queue.producer';

@Injectable()
export class TaskQueueService {
  constructor(private readonly emailQueueProducerService: EmailQueueProducer) {}

  public async addToEmailQueue(mailSendDto: MailSendDto) {
    await this.emailQueueProducerService.emailJob({
      ...mailSendDto,
      isNewAttempt: true,
    });
  }

  public async addToEmailQueueReAttempt(failedJobs: Email[]) {
    console.log('failed jobs>>', failedJobs);

    // await this.emailQueueProducerService.emailJob({
    //   ...mailSendDto,
    //   isNewAttempt: false,
    // });
  }
}
