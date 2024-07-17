import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUsersDto } from './dto/createUsers.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly usersRepository: UsersRepository) {}

  async createNewUser(createUsersDto: CreateUsersDto) {
    this.logger.log(`Trying to create User`);

    const { raw } = await this.usersRepository.createNewUser(createUsersDto);

    this.logger.debug(`User successfully created with id: ${raw[0].id}`);
  }

  async getUsers() {
    this.logger.log(`Trying to get Users`);

    const [users, count] = await this.usersRepository.getUsers();

    this.logger.debug(`${count} User successfully get`);

    return users;
  }
}
