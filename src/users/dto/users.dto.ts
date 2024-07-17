import { IsEmail, IsInt, IsString, Length } from 'class-validator';
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
  @Length(4, 40)
  password: User['password'];
}
