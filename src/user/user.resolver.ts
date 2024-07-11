import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorator/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity], { name: 'users' })
  findAll(@Args('name', { nullable: true }) name?: string) {
    return this.userService.findAll(name);
  }

  @Mutation(() => UserEntity)
  register(
    @Args('user')
    user: UserDto,
  ): Promise<UserEntity> {
    return this.userService.create(user);
  }

  @Mutation(() => UserEntity)
  update(
    @Args('user')
    user: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(user.id, user);
  }

  @Query(() => UserEntity)
  @UseGuards(JwtAuthGuard)
  profile(@CurrentUser() user: UserEntity) {
    return user;
  }
}
