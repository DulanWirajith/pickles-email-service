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
      this.logger.log(job.data);
      this.logger.debug(
        `Processing - Email Queue ID: ${job.id} with DATA: ${JSON.stringify(
          job.data,
        )}`,
      );

      const { externalId, to, emailType, context } = job.data;
      let emailRes;

      if (job.attemptsMade === 0 && job.data.isNewAttempt) {
        emailRes = await this.prisma.email.create({
          data: {
            externalId,
            to,
            type: emailType,
            attributes: {
              context,
            },
          },
        });
      } else {
        emailRes = await this.prisma.email.findUnique({
          where: {
            externalId,
          },
          select: {
            id: true,
            attemptsCount: true,
          },
        });
      }

      const logRes = await this.prisma.taskQueueLog.create({
        data: {
          queueName: EMAIL_QUEUE,
          jobId: job.id.toString(),
          jobData: job.data,
          job: job as any,
          status: EmailStatusEnum.PROCESS,
          isNewAttempt: job.data.isNewAttempt,
        },
      });

      await this.makeConnection(
        emailRes.id,
        logRes.id,
        emailRes.attemptsCount,
        EmailStatusEnum.PROCESS,
      );
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
          attemptsCount: true,
        },
      });

      const logRes = await this.prisma.taskQueueLog.create({
        data: {
          queueName: EMAIL_QUEUE,
          jobId: job.id.toString(),
          jobData: job.data,
          job: job as any,
          status: EmailStatusEnum.SUCCESS,
          isNewAttempt: job.data.isNewAttempt,
        },
      });

      await this.makeConnection(
        emailRes.id,
        logRes.id,
        emailRes.attemptsCount,
        EmailStatusEnum.SUCCESS,
      );
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @OnQueueEvent(BullQueueEvents.FAILED)
  async onFail(job: Job) {
    try {
      this.logger.error(
        `Failed - Email Queue ID ${job.id} with RESULT: ${
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
          attemptsCount: true,
        },
      });

      const logRes = await this.prisma.taskQueueLog.create({
        data: {
          queueName: EMAIL_QUEUE,
          jobId: job.id.toString(),
          jobData: job.data,
          job: job as any,
          status: EmailStatusEnum.FAILED,
          isNewAttempt: job.data.isNewAttempt,
        },
      });

      await this.makeConnection(
        emailRes.id,
        logRes.id,
        emailRes.attemptsCount,
        EmailStatusEnum.FAILED,
      );
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async makeConnection(
    emailId: string,
    logId: string,
    attemptsCount: number,
    emailStatus: EmailStatusEnum,
  ) {
    await this.prisma.email.update({
      where: {
        id: emailId,
      },
      data: {
        status: emailStatus,
        attemptsCount:
          emailStatus === EmailStatusEnum.PROCESS
            ? attemptsCount + 1
            : attemptsCount,
        logs: {
          connect: {
            id: logId,
          },
        },
      },
    });
  }
}
