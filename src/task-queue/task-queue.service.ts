import { Injectable } from '@nestjs/common';
import { EmailTypesEnum } from '@prisma/client';
import { MailSendDto } from '../mail/dto/mail-send.dto';
import { EmailQueueProducer } from './producer/email-queue.producer';

@Injectable()
export class TaskQueueService {
  constructor(private readonly emailQueueProducerService: EmailQueueProducer) {}

  public async addToEmailQueue(mailSendDto: MailSendDto) {
    await this.emailQueueProducerService.emailJob(
      {
        ...mailSendDto,
        isNewAttempt: true,
      },
      1,
    );
  }

  public async addToEmailQueueReAttempt(
    failedJobs: {
      externalId: string;
      to: string;
      type: EmailTypesEnum;
      attributes: any;
    }[],
  ) {
    // eslint-disable-next-line no-restricted-syntax
    for (const failedJob of failedJobs) {
      const { attributes, ...rest } = failedJob;
      // eslint-disable-next-line no-await-in-loop
      await this.emailQueueProducerService.emailJob(
        {
          ...rest,
          context: attributes?.context,
          isNewAttempt: false,
        },
        2,
      );
    }
  }
}
