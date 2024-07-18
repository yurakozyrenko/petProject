import { Body, Controller, Get, HttpException, HttpStatus, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/users.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtGuard } from '../strategy/jwtAuth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  @UseGuards(JwtGuard)
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Req() request: Request) {
    console.log(request);
    // const email = request.user.email;
    // await this.usersService.updateUser(email, updateUserDto);
    throw new HttpException('User successfully updated', HttpStatus.OK);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }
}
