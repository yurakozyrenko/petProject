import { Injectable } from '@nestjs/common';
// import { UsersRepository } from './users.repository';
import { users } from '../mock';

@Injectable()
export class UsersService {
  //   constructor(private usersRepository: UsersRepository) {}

  async getUsers() {
    // const [users, count] = await this.usersRepository.getUsers();
    // const users = users

    return users;
  }
}
