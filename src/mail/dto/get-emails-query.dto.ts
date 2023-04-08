import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetEmailsQueryDto {
  @ApiProperty({
    description: 'limit',
    example: '10',
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  size: number;

  @ApiProperty({
    description: 'page',
    example: '1',
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    description: 'email',
    example: 'dulan',
    required: false,
  })
  @IsString()
  @IsOptional()
  email: string;
}
