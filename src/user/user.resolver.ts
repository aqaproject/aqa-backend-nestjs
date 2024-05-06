import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { CurrentUser } from './decorator/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @Query(() => UserEntity)
  @UseGuards(JwtAuthGuard)
  profile(@CurrentUser() user: UserEntity) {
    return user;
  }
}
