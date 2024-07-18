import { IsEmail, IsInt, IsString, Length } from 'class-validator';
import { User } from '../entity/users.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsInt()
  id: User['id'];

  @ApiProperty()
  @IsString()
  firstname: User['firstname'];

  @ApiProperty()
  @IsString()
  username: User['username'];

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: User['email'];

  @ApiProperty()
  @IsString()
  @Length(4, 40)
  password: User['password'];
}
