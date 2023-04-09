import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserRegistrationDto } from './dto/user-registration.dto';

@ApiTags('Users Controller')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  checkHealth(): string {
    return this.usersService.checkHealth();
  }

  @Post('/registration')
  userRegistration(@Body() userRegistrationDto: UserRegistrationDto) {
    return this.usersService.userRegistration(userRegistrationDto);
  }
}
