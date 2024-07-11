import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../enums/role.enum';

@InputType()
export class UpdateUserDto {
  @Field(() => String, { nullable: false })
  id?: string;

  @Field(() => Role)
  role?: Role;

  @Field(() => String, { nullable: true, defaultValue: '' })
  displayName?: string;

  @Field(() => String)
  username?: string;

  @Field(() => String, { nullable: true })
  facultyId?: string;

  @Field(() => String)
  password?: string;

  @Field(() => Date)
  lastAccess: Date;
}
