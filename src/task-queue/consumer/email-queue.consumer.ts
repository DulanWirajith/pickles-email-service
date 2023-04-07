import {
  BullQueueEvents,
  OnQueueActive,
  OnQueueEvent,
  Process,
  Processor,
} from '@nestjs/bull';
import { BadRequestException, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { EMAIL_QUEUE } from '../constants/task-queue-names.constant';
import { MailService } from '../../mail/mail.service';
import { MailSendDto } from '../../mail/dto/mail-send.dto';
import { PrismaService } from '../../prisma.service';
import { EmailStatusEnum } from '../enum/email-status.enum';

@Processor(EMAIL_QUEUE)
export class EmailQueueConsumer {
  logger: Logger;
  constructor(
    private readonly mailService: MailService,
    private readonly prisma: PrismaService,
  ) {
    this.logger = new Logger(EmailQueueConsumer.name);
  }

  @Process()
  async sendEmail(job: Job<unknown>) {
    await this.mailService.sendTheMail(job.data as MailSendDto);
  }

  @OnQueueActive()
  async onActive(job: Job) {
    try {
      this.logger.debug(
        `Processing - Email Queue ID: ${job.id} with DATA: ${JSON.stringify(
          job.data,
        )}`,
      );

      const { externalId, to, emailType } = job.data;
      const emailRes = await this.prisma.email.create({
        data: {
          externalId,
          to,
          type: emailType,
        },
      });

      const logRes = await this.prisma.taskQueueLog.create({
        data: {
          queueName: EMAIL_QUEUE,
          jobId: job.id.toString(),
          jobData: job.data,
          job: job as any,
          status: EmailStatusEnum.PROCESS,
        },
      });

      await this.makeConnection(emailRes.id, logRes.id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @OnQueueEvent(BullQueueEvents.COMPLETED)
  async onCompleted(job: Job) {
    try {
      this.logger.warn(
        `Completed - Email Queue ID ${job.id} with RESULT: ${
          job.returnvalue
        } and DATA: ${JSON.stringify(job)}`,
      );
      const { externalId } = job.data;
      const emailRes = await this.prisma.email.findUnique({
        where: {
          externalId,
        },
        select: {
          id: true,
        },
      });

      const logRes = await this.prisma.taskQueueLog.create({
        data: {
          queueName: EMAIL_QUEUE,
          jobId: job.id.toString(),
          jobData: job.data,
          job: job as any,
          status: EmailStatusEnum.SUCCESS,
        },
      });

      await this.makeConnection(emailRes.id, logRes.id);
    } catch (e) {
      throw new BadRequestException(e);
    }
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

  async makeConnection(emailId: string, logId: string) {
    await this.prisma.email.update({
      where: {
        id: emailId,
      },
      data: {
        logs: {
          connect: {
            id: logId,
          },
        },
      },
    });
  }
}
