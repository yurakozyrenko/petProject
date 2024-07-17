import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TPayload } from '../utils/types';

@Injectable()
export class TokenService {
  private readonly secret: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.secret = this.configService.getOrThrow('SECRET_JWT');
  }

  async generateJwtToken(payload: TPayload) {
    return this.jwtService.sign(payload, {
      secret: this.secret,
    });
  }
}
