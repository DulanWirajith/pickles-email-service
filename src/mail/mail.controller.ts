import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { MailSendDto } from './dto/mail-send.dto';
import { SentryInterceptor } from '../util/sentry.interceptor';
import { GetEmailsQueryDto } from './dto/get-emails-query.dto';

@UseInterceptors(SentryInterceptor)
@Controller('mail')
@ApiTags('Mail Controller')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-mail')
  sendMail(@Body() mailSendDto: MailSendDto) {
    return this.mailService.sendTheMail(mailSendDto);
  }

  @Post('handle-mail-send')
  handleMailSend(@Body() mailSendDto: MailSendDto) {
    return this.mailService.handleMailSend(mailSendDto);
  }

  @Get('/get-all-mails')
  getAllEmails(@Query() getEmailsQueryDto: GetEmailsQueryDto) {
    console.log(getEmailsQueryDto);
    return this.mailService.getAllEmails(getEmailsQueryDto);
  }
}
