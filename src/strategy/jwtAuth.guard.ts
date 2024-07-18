import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req);
    return super.canActivate(context);
  }
}
