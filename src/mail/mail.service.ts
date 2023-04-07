import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailSendDto } from './dto/mail-send.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendTheMail(mailSendDto: MailSendDto) {
    //   await this.mailerService.sendMail({
    //     to: mailSendDto.to,
    //     from: mailSendDto.from
    //       ? mailSendDto.from
    //       : '"Dulan Lokunarangodage" <mailtodulan@gmail.com>',
    //     subject: mailSendDto.subject,
    //     template: mailSendDto.template, // `.hbs` extension is appended automatically
    //     context: mailSendDto.context,
    //   });
    // }
    await this.mailerService.sendMail({
      to: mailSendDto.to,
      from: '"Dulan Lokunarangodage" <mailtodulan@gmail.com>',
      subject: 'Welcome to MLI! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        name: mailSendDto.firstName,
        randomNumber: '123',
      },
    });
  }
}
