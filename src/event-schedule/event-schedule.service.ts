import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment';
import { PrismaService } from '../prisma.service';
import { EmailStatusEnum } from '../task-queue/enum/email-status.enum';
import { TaskQueueService } from '../task-queue/task-queue.service';

@Injectable()
export class EventScheduleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly taskQueueService: TaskQueueService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'resend_failed_mails',
  })
  async deleteExpiredUsers() {
    // this.logger.log('Deleting expired users...');
    const failedJobs = await this.prisma.email.findMany({
      where: {
        status: EmailStatusEnum.FAILED,
        createdAt: {
          gte: moment().subtract(1, 'hour').toISOString(),
          lt: moment().toISOString(),
        },
      },
    });

    this.taskQueueService.addToEmailQueueReAttempt(failedJobs);
  }
}
