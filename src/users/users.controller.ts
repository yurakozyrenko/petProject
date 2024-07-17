import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/users.entity';
import { CreateUsersDto } from './dto/createUsers.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUsersDto: CreateUsersDto) {
    await this.usersService.createNewUser(createUsersDto);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }
}
