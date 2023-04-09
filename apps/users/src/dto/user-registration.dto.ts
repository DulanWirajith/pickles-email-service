import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegistrationDto {
  @ApiProperty({
    description: 'first name',
    example: 'Dulan',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'last name',
    example: 'Lokunarangodage',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'email',
    example: 'mailtodulan@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password',
    example: 'user@12345',
  })
  @IsString()
  password: string;
}
