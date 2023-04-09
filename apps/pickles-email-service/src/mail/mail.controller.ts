import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { MailService } from './mail.service';
import { MailSendDto } from './dto/mail-send.dto';
import { SentryInterceptor } from '../util/sentry.interceptor';
import { GetEmailsQueryDto } from './dto/get-emails-query.dto';
import { AuthorizeChannelDto } from './dto/channel-authorize.dto';

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
    return this.mailService.getAllEmails(getEmailsQueryDto);
  }

  @Post('/auth/channel-auth')
  authorizeChannel(
    @Body() authorizeChannelDto: AuthorizeChannelDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.mailService.authorizeChannel(authorizeChannelDto, req, res);
  }

  // for test pusher integration
  @Get()
  createEmailNotification() {
    return this.mailService.createEmailNotification();
  }
}
