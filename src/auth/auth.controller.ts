import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { TToken } from '../utils/types';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from '../users/dto/userLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSerivice: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201 })
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    await this.authSerivice.registerUser(createUserDto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200 })
  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<TToken> {
    return await this.authSerivice.loginUser(userLoginDto);
  }
}
