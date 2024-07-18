import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.createQueryBuilder('users').where('users.email = :email', { email }).getOne();
  }

  async updateUser(email: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.userRepository
      .createQueryBuilder('users')
      .update(User)
      .set(updateUserDto)
      .where('users.email = :email', { email })
      .execute();
  }

  async createNewUser(createUserDto: CreateUserDto): Promise<InsertResult> {
    return await this.userRepository.createQueryBuilder('users').insert().into(User).values(createUserDto).execute();
  }

  async getUsers(): Promise<[User[], number]> {
    return await this.userRepository.createQueryBuilder('users').getManyAndCount();
  }
}
