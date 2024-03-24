import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import { RequestUserDto } from './dto/user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/user/decorator/user.decorator';
import { UserService } from 'src/user/user.service';
import { validate } from 'graphql';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly jwtService: JwtService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Query(() => UserEntity)
  async login(@Args() credential: RequestUserDto) {
    const user = this.authService.validateUser(credential);
    if (user) return user;
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity)
  async currentUser(@CurrentUser() user: UserEntity) {
    return this.userService.findByUsername(user.username);
  }
}
