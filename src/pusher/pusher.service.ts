import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  pusher: Pusher;
  constructor(configService: ConfigService) {
    this.pusher = new Pusher({
      appId: configService.get<string>('PUSHER_APP_ID'),
      key: configService.get<string>('PUSHER_APP_KEY'),
      secret: configService.get<string>('PUSHER_APP_SECRET'),
      cluster: configService.get<string>('PUSHER_APP_CLUSTER'),
      encrypted: true,
    });
  }

  trigger(channel: string, event: string, data: any) {
    const resposne = this.pusher.trigger(channel, event, data);
    return resposne;
  }

  authorizeChannel(socket_id, channel_id, presenceData) {
    return this.pusher.authorizeChannel(socket_id, channel_id, presenceData);
  }
}
