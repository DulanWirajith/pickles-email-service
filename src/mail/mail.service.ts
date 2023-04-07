import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { MailSendDto } from './dto/mail-send.dto';

@Injectable()
export class MailService {
  logger: Logger;
  constructor(private mailerService: MailerService) {
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
    } catch (e) {
      // todo ERROR HANDLING
      console.log(e);
    }
  }
}
