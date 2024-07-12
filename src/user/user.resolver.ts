import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Faculty } from 'src/faculty/entities/faculty.entity';
import { CurrentUser } from './decorator/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity], { name: 'users' })
  findAll(@Args('name', { nullable: true }) name?: string) {
    return this.userService.findAll(name);
  }

  @Mutation(() => UserEntity)
  registerUser(
    @Args('user')
    user: UserDto,
  ): Promise<UserEntity> {
    return this.userService.create(user);
  }

  @Mutation(() => UserEntity)
  updateUser(
    @Args('user')
    user: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(user.id, user);
  }

  @Mutation(() => Boolean)
  async removeUser(
    @Args('id')
    id: string,
  ): Promise<any> {
    await this.userService.remove(id);
    return true;
  }

  @Query(() => UserEntity)
  @UseGuards(JwtAuthGuard)
  profile(@CurrentUser() user: UserEntity) {
    return user;
  }

  @ResolveField(() => Faculty, { nullable: true })
  faculty(@Parent() user: UserEntity) {
    return user.faculty;
  }
}
