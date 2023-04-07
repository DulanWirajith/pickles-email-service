import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { MailSendDto } from './dto/mail-send.dto';
import { SentryInterceptor } from '../util/sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@Controller('mail')
@ApiTags('Mail Controller')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-mail')
  sendMail(@Body() mailSendDto: MailSendDto) {
    console.log(mailSendDto);
    return this.mailService.sendTheMail(mailSendDto);
  }
}
