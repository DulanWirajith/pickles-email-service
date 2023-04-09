import { IsString } from 'class-validator';

export class AuthorizeChannelDto {
  @IsString()
  userId: string;
}
