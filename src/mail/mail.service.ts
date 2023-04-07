import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MailSendDto } from './dto/mail-send.dto';
import { TaskQueueService } from '../task-queue/task-queue.service';

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
      await this.mailerService.sendMail({
        to: mailSendDto.to,
        from: mailSendDto.from
          ? mailSendDto.from
          : '"Dulan Lokunarangodage" <mailtodulan@gmail.com>',
        subject: mailSendDto.subject,
        template: mailSendDto.template, // `.hbs` extension is appended automatically
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
