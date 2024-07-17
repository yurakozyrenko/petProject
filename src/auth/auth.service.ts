import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUsersDto } from '../users/dto/createUsers.dto';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { TToken } from '../utils/types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser({ firstname, username, email, password }: CreateUsersDto) {
    const existUser = await this.userService.findUserByEmail(email);

    if (existUser) {
      this.logger.error(`User with email: ${email} already exist`);
      throw new HttpException(`User with email: ${email} already exist`, HttpStatus.BAD_REQUEST);
    }

    const createUsersDto = {
      firstname,
      username,
      email,
      password,
    };

    return this.userService.createNewUser(createUsersDto);
  }

  async loginUser({ email, password }: AuthDto): Promise<TToken> {
    const existUser = await this.userService.findUserByEmail(email);

    if (!existUser) {
      throw new BadRequestException('email incorrect');
    }

    const isValidPassword = await this.validatePassword(password, existUser.password);

    if (!isValidPassword) {
      throw new BadRequestException('password incorrect');
    }

    this.logger.log(`Trying to create token User with email: ${email}`);

    const token = await this.tokenService.generateJwtToken({ email });

    this.logger.debug(`User token successfully created with email: ${email}`);

    return { token };
  }

  async validatePassword(password: string, adminPassword: string): Promise<boolean> {
    const isMatch = bcrypt.compareSync(password, adminPassword);

    if (!isMatch) {
      throw new BadRequestException('password incorrect');
    }

    return isMatch;
  }
}
