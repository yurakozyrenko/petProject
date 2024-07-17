import { PickType } from '@nestjs/mapped-types';

import { UsersDto } from './users.dto';

export class CreateUsersDto extends PickType(UsersDto, []) {}
