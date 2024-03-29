import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserDto {
  @Field(() => String)
  role: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
