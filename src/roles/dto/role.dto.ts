import { IsInt, IsString } from 'class-validator';
import { Role } from '../entity/roles.entity';

export class RoleDto {
  @IsInt()
  id: Role['id'];

  @IsString()
  value: Role['value'];

  @IsString()
  description: Role['description'];
}
