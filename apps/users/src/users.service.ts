import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserRegistrationDto } from './dto/user-registration.dto';

@Injectable()
export class UsersService {
  usersArr = [
    {
      firstName: 'Dulan',
      lastName: 'Lokunarangodage',
      email: 'mailtodulan@gmail.com',
      password: 'user@12345',
      id: uuidv4(),
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
      id: uuidv4(),
    });
    console.log(this.usersArr);
    return this.usersArr[this.usersArr.length - 1];
  }
}
