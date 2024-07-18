import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/users.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtGuard } from '../strategy/jwtAuth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('API')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 200, type: User })
  @Patch()
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    throw new HttpException('User successfully update', HttpStatus.OK);
  }

  @ApiOperation({ summary: 'Get Users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @ApiOperation({ summary: 'Delete User' })
  @Delete()
  async deleteUser() {
    throw new HttpException('User successfully delete', HttpStatus.OK);
  }
}
