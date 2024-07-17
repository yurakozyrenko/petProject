import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDto } from '../users/dto/createUsers.dto';
import { AuthDto } from './dto/auth.dto';
import { TToken } from '../utils/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSerivice: AuthService) {}

  @Post('register')
  async register(@Body() createUsersDto: CreateUsersDto) {
    await this.authSerivice.registerUser(createUsersDto);
  }

  @Post('login')
  async login(@Body() authDto: AuthDto): Promise<TToken> {
    return await this.authSerivice.loginUser(authDto);
  }
}
