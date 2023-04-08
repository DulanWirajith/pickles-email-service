import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { EMAIL_QUEUE } from '../constants/task-queue-names.constant';

@Injectable()
export class EmailQueueProducer {
  constructor(@InjectQueue(EMAIL_QUEUE) private readonly emailQueue: Queue) {}

  async emailJob(data) {
    // Queue - Daily job
    // await this.emailQueue.add('send-email', mailSendDto, {
    //   repeat: {
    //     cron: '0 */6 * * *',
    //   },
    // });

    await this.emailQueue.add(data, {
      attempts: 3,
      removeOnComplete: true,
      priority: 1,
    });
  }
}
