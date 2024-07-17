import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { CreateUsersDto } from './dto/createUsers.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createNewUser(createUsersDto: CreateUsersDto): Promise<InsertResult> {
    return await this.userRepository
      .createQueryBuilder('user')
      .insert()
      .into(User)
      .values(createUsersDto)
      .execute();
  }

  async getUsers(): Promise<[User[], number]> {
    return await this.userRepository.createQueryBuilder('user').getManyAndCount();
  }
}
