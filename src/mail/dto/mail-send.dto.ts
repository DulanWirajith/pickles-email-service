import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EmailTypesEnum } from '../enum/email-types.enum';

export class MailSendDto {
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
    description: 'first name',
    example: 'Dulan',
  })
  @IsString()
  firstName: string;

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
