import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { MailSendDto } from './dto/mail-send.dto';
import { TaskQueueService } from '../task-queue/task-queue.service';
import { EMAIL_CONFIG } from './constants/email-config.constant';
import { EmailTypesEnum } from './enum/email-types.enum';
import { PrismaService } from '../prisma.service';
import { GetEmailsQueryDto } from './dto/get-emails-query.dto';
import { AuthorizeChannelDto } from './dto/channel-authorize.dto';
import { PusherService } from '../pusher/pusher.service';

@Injectable()
export class MailService {
  logger: Logger;
  constructor(
    private readonly mailerService: MailerService,
    private readonly taskQueueService: TaskQueueService,
    private readonly prisma: PrismaService,
    private readonly pusherService: PusherService,
  ) {
    this.logger = new Logger(MailService.name);
  }

  async sendTheMail(mailSendDto: MailSendDto) {
    try {
      const emailConfig = EMAIL_CONFIG[EmailTypesEnum[mailSendDto.emailType]];

      await this.mailerService.sendMail({
        to: mailSendDto.to,
        from: mailSendDto.from
          ? mailSendDto.from
          : '"ZeeLot" <mailtozeelot@gmail.com>',
        subject: emailConfig.subject,
        template: emailConfig.template, // `.hbs` extension is appended automatically
        context: mailSendDto.context,
      });
      this.logger.log(`mail sent successfully to: ${mailSendDto.to}`);
      // throw new BadRequestException();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async handleMailSend(mailSendDto: MailSendDto) {
    this.taskQueueService.addToEmailQueue(mailSendDto);
  }

  async getAllEmails(emailsQueryDto: GetEmailsQueryDto) {
    try {
      const { emails, emailsCount } = await this.getEmailsData(emailsQueryDto);

      return {
        content: emails,
        totalElements: emailsCount,
        size: emailsQueryDto.size,
        page: emailsQueryDto.page,
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  private async getEmailsData(emailsQueryDto: GetEmailsQueryDto) {
    try {
      const whereClause: any = {
        ...(emailsQueryDto.email && {
          to: {
            contains: emailsQueryDto.email,
            mode: 'insensitive',
          },
        }),
      };

      const emails = await this.prisma.email.findMany({
        where: {
          ...whereClause,
        },
        orderBy: {
          createdAt: 'desc',
        },
        ...(emailsQueryDto.page && {
          skip: emailsQueryDto.page * emailsQueryDto.size,
        }),
        ...(emailsQueryDto.size && {
          take: emailsQueryDto.size,
        }),
        select: {
          id: true,
          to: true,
          externalId: true,
          type: true,
          attemptsCount: true,
          attributes: true,
          status: true,
        },
      });
      const emailsCount = await this.prisma.email.count({
        where: {
          ...whereClause,
        },
      });
      return {
        emails,
        emailsCount,
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  authorizeChannel(
    authorizeChannelDto: AuthorizeChannelDto,
    req: Request,
    res: Response,
  ) {
    try {
      // todo Authorization Logic goes here

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { socket_id } = req.body;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { channel_name } = req.body;

      const presenceData = {
        user_id: authorizeChannelDto.userId,
        user_info: {
          fullName: 'Dulan Lokunarangodage',
        },
      };

      const authResponse = this.pusherService.authorizeChannel(
        socket_id,
        channel_name,
        presenceData,
      );

      res.status(200).send(authResponse);
    } catch (error) {
      throw new BadRequestException('something went wrong');
    }
  }

  async createEmailNotification() {
    try {
      await this.pusherService.trigger(
        'presence-dulan',
        'new_email_notification',
        {
          hey: 'hey bro',
        },
      );
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
