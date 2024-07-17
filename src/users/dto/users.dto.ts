import { IsEmail, IsInt, IsString } from 'class-validator';
import { User } from '../entity/users.entity';

export class UsersDto {
  @IsInt()
  id: User['id'];

  @IsString()
  firstname: User['firstname'];

  @IsString()
  username: User['username'];

  @IsString()
  @IsEmail()
  email: User['email'];

  @IsString()
  password: User['password'];
}
