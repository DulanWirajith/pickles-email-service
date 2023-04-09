import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EmailTypesEnum } from '../enum/email-types.enum';

export class MailSendDto {
  @ApiProperty({
    description: 'external Id for identify email send request',
    example: '015cb4b5-f574-4881-a397-acd928b317c0',
  })
  @IsString()
  externalId: string;

  @ApiProperty({
    description: 'to mail',
    example: 'dulanwirajith1995@gmail.com',
  })
  @IsEmail()
  to: string;

  @ApiProperty({
    description: 'from mail',
    example: 'mailtodulan@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  from: string;

  @ApiProperty({
    description: 'email type',
    example: 'CONFIRM_EMAIL',
  })
  @IsString()
  emailType: EmailTypesEnum;

  @ApiProperty({
    description: 'context',
    example: {},
  })
  @IsObject()
  context: any;
}
