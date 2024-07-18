import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { ConfigService } from '@nestjs/config';
import { User } from './entity/users.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

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

  async updateUser(email: User['email'], { firstname, username }: UpdateUserDto) {
    this.logger.log(`Trying to updated User with email: ${email}`);

    const updateUserDto: UpdateUserDto = {
      firstname,
      username,
    };

    const { raw } = await this.usersRepository.updateUser(email, updateUserDto);

    this.logger.debug(`User successfully updated with id: ${raw[0].id}`);
  }

  async createNewUser(createUserDto: CreateUserDto) {
    this.logger.log(`Trying to create User`);

    const { raw } = await this.usersRepository.createNewUser(createUserDto);

    this.logger.debug(`User successfully created with id: ${raw[0].id}`);
  }

  async deleteUser(email: User['email']) {
    this.logger.log(`Trying to delete User with email: ${email}`);

    const { raw } = await this.usersRepository.deleteUser(email);

    this.logger.debug(`User successfully delete with id: ${raw[0].id}`);
  }

  async getUsers(): Promise<User[]> {
    this.logger.log(`Trying to get Users`);

    const [users, count] = await this.usersRepository.getUsers();

    this.logger.debug(`${count} User successfully get`);

    return users;
  }
}
