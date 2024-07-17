import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class RegisterUserDto extends PickType(UserDto, ['firstname', 'username', 'email', 'password']) {}
