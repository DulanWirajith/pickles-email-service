import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EventScheduleService {
  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'resend_failed_mails',
  })
  deleteExpiredUsers() {
    // this.logger.log('Deleting expired users...');
    console.log('resend_failed_mails');
  }
}
