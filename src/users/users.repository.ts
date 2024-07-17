import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.createQueryBuilder('users').where('users.email = :email', { email }).getOne();
  }

  async createNewUser(createUserDto: CreateUserDto): Promise<InsertResult> {
    return await this.userRepository.createQueryBuilder('users').insert().into(User).values(createUserDto).execute();
  }

  async getUsers(): Promise<[User[], number]> {
    return await this.userRepository.createQueryBuilder('users').getManyAndCount();
  }
}
