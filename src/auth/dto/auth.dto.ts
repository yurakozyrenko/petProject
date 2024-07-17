import { IsString, Length } from 'class-validator';
import { User } from '../../users/entity/users.entity';

export class AuthDto {
  @IsString()
  email: User['email'];

  @IsString()
  @Length(4, 40)
  password: User['password'];
}
