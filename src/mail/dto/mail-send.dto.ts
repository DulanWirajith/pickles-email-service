import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
    description: 'subject',
    example: 'This is Testing',
  })
  @IsString()
  subject: string;

  @ApiProperty({
    description: 'template name',
    example: './confirmation',
  })
  @IsString()
  template: string;

  @ApiProperty({
    description: 'context',
    example: {},
  })
  @IsObject()
  context: any;
}
