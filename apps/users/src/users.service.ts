import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { PICKLES_EMAIL_SERVICE } from './constants/services.constant';
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

  constructor(
    @Inject(PICKLES_EMAIL_SERVICE) private picklesEmailClient: ClientProxy,
  ) {}

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
    this.picklesEmailClient.emit('new_email_send_request', {
      to: userRegistrationDto.email,
    });
    console.log(this.usersArr);
    return this.usersArr[this.usersArr.length - 1];
  }
}
