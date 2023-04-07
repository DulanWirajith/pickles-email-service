import { Injectable } from '@nestjs/common';
import { MailSendDto } from '../mail/dto/mail-send.dto';
import { EmailQueueProducer } from './producer/email-queue.producer';

@Injectable()
export class TaskQueueService {
  constructor(private readonly emailQueueProducerService: EmailQueueProducer) {}

  public async addToEmailQueue(mailSendDto: MailSendDto) {
    await this.emailQueueProducerService.emailJob(mailSendDto);
  }
}
