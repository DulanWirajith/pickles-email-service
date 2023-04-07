import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MailSendDto } from './dto/mail-send.dto';
import { TaskQueueService } from '../task-queue/task-queue.service';
import { EMAIL_CONFIG } from './constants/email-config.constant';
import { EmailTypesEnum } from './enum/email-types.enum';

@Injectable()
export class MailService {
  logger: Logger;
  constructor(
    private readonly mailerService: MailerService,
    private readonly taskQueueService: TaskQueueService,
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
          : '"Dulan Lokunarangodage" <mailtodulan@gmail.com>',
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
}
