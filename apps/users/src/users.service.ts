import { Injectable } from '@nestjs/common';
import { UserRegistrationDto } from './dto/user-registration.dto';

@Injectable()
export class UsersService {
  usersArr = [
    {
      firstName: 'Dulan',
      lastName: 'Lokunarangodage',
      email: 'mailtodulan@gmail.com',
      password: 'user@12345',
    },
  ];

  checkHealth(): string {
    return 'Users Service is running 🚀';
  }

  userRegistration(userRegistrationDto: UserRegistrationDto) {
    this.usersArr.push({
      firstName: userRegistrationDto.firstName,
      lastName: userRegistrationDto.lastName,
      email: userRegistrationDto.email,
      password: userRegistrationDto.password,
    });
    console.log(this.usersArr);
    return userRegistrationDto;
  }
}
