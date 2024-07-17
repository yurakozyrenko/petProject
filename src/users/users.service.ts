import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private readonly hash: number;
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {
    this.hash = this.configService.getOrThrow('HASH.HASH_LENGTH');
  }

  async findUserByEmail(email: User['email']): Promise<User> {
    this.logger.log(`Trying to get User by email ${email}`);

    const user = this.usersRepository.findUserByEmail(email);

    this.logger.debug(`User successfully get by email ${email}`);

    return user;
  }

  async createNewUser({ firstname, username, email, password }: CreateUserDto) {
    this.logger.log(`Trying to create User with email: ${email}`);

    const hashedPassword = await bcrypt.hash(password, this.hash);

    const createUserDto: CreateUserDto = {
      firstname,
      username,
      email,
      password: hashedPassword,
    };

    const { raw } = await this.usersRepository.createNewUser(createUserDto);

    this.logger.debug(`User successfully created with id: ${raw[0].id}`);
  }

  async getUsers() {
    this.logger.log(`Trying to get Users`);

    const [users, count] = await this.usersRepository.getUsers();

    this.logger.debug(`${count} User successfully get`);

    return users;
  }
}
