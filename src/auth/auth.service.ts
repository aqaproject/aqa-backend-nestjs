import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RequestUserDto } from './dto/user.dto';
import { UserDto } from 'src/user/dto/user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userRequest: RequestUserDto): Promise<UserEntity> {
    const user = await this.userService.findByUsername(userRequest.username);
    if (user && bcrypt.compare(userRequest.password, user.password))
      return user;
    else throw new UnauthorizedException();
  }

  async login(user: UserEntity) {
    const payload = { user: user, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
