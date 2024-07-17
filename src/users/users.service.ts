import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUsersDto } from './dto/createUsers.dto';
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

  async createNewUser({ firstname, username, email, password }: CreateUsersDto) {
    this.logger.log(`Trying to create User with email: ${email}`);

    const existUser = await this.usersRepository.findUserByEmail(email);

    if (existUser) {
      this.logger.error(`User with email: ${email} already exist`);
      throw new HttpException(`User with email: ${email} already exist`, HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, this.hash);

    const createUsersDto: CreateUsersDto = {
      firstname,
      username,
      email,
      password: hashedPassword,
    };

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
