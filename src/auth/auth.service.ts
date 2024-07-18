import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import { TToken } from '../utils/types';
import { UserLoginDto } from '../users/dto/userLogin.dto';
import { RegisterUserDto } from '../users/dto/registerUser.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly hash: number;

  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    this.hash = this.configService.getOrThrow('HASH.HASH_LENGTH');
  }

  async registerUser({ firstname, username, email, password }: RegisterUserDto): Promise<TToken> {
    const existUser = await this.userService.findUserByEmail(email);

    if (existUser) {
      this.logger.error(`User with email: ${email} already exist`);
      throw new HttpException(`User with email: ${email} already exist`, HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, this.hash);

    const createUserDto = {
      firstname,
      username,
      email,
      password: hashedPassword,
    };

    await this.userService.createNewUser(createUserDto);

    const payload = {
      email,
    };

    this.logger.log(`Trying to create token User with email: ${email}`);

    const token = await this.tokenService.generateJwtToken(payload);

    this.logger.debug(`User token successfully created with email: ${email}`);

    return { token };
  }

  async loginUser({ email, password }: UserLoginDto): Promise<TToken> {
    const existUser = await this.userService.findUserByEmail(email);

    if (!existUser) {
      throw new BadRequestException('email incorrect');
    }

    const isValidPassword = await this.validatePassword(password, existUser.password);

    if (!isValidPassword) {
      throw new BadRequestException('password incorrect');
    }

    const payload = {
      email: existUser.email,
    };

    this.logger.log(`Trying to create token User with email: ${email}`);

    const token = await this.tokenService.generateJwtToken(payload);

    this.logger.debug(`User token successfully created with email: ${email}`);

    return { token };
  }

  async validatePassword(password: string, userPassword: string): Promise<boolean> {
    const isMatch = bcrypt.compareSync(password, userPassword);

    if (!isMatch) {
      throw new BadRequestException('password incorrect');
    }

    return isMatch;
  }
}
