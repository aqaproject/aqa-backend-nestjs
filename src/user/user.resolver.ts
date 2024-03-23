import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  register(
    @Args('user')
    user: UserDto,
  ): Promise<UserEntity> {
    return this.userService.create(user);
  }
}
