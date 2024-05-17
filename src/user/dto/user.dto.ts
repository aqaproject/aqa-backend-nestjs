import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../enums/role.enum';

@InputType()
export class UserDto {
  @Field(() => Role)
  role: Role;

  @Field(() => String, { nullable: true, defaultValue: '' })
  displayName: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
