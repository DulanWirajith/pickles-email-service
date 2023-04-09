import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  checkHealth(): string {
    return this.appService.checkHealth();
  }

  @EventPattern('new_email_send_request')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('hey');
    console.log(data);
    console.log(context);
  }
}
