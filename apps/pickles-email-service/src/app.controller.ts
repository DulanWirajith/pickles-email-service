import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { MailSendDto } from './mail/dto/mail-send.dto';
import { MailService } from './mail/mail.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
  ) {}

  @Get('health')
  checkHealth(): string {
    return this.appService.checkHealth();
  }

  @EventPattern('new_email_send_request')
  async handleNewEmailSendRequest(
    @Payload() data: MailSendDto,
    @Ctx() context: RmqContext,
  ) {
    this.mailService.handleMailSend(data);
    console.log('hey');
    console.log(data);
    console.log(context);
  }
}
