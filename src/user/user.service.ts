import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { searchString } from 'src/common/utils/searchString';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async create(user: UserDto): Promise<UserEntity> {
    user.password = await bcrypt.hash(user.password, 0);
    return this.userRepo.save(user);
  }

  async findByUsername(username: string) {
    return this.userRepo.findOneBy({ username });
  }

  async findAll(name?: string) {
    return this.userRepo
      .createQueryBuilder('User')
      .where(
        name
          ? `unaccent(User.displayName) ilike ('%' || unaccent(:keyword) || '%')`
          : '',
        { keyword: name || '' },
      )
      .orWhere(
        name
          ? `unaccent(User.username) ilike ('%' || unaccent(:keyword) || '%')`
          : '',
        { keyword: name || '' },
      )
      .getMany();
  }

  async findById(id: string) {
    return this.userRepo.findOneBy({ id });
  }

  async update(id: string, userDto: UserDto): Promise<UserEntity> {
    const user = await this.userRepo.findOneBy({ id });

    Object.assign(user, userDto);
    if (userDto.password) {
      user.password = await bcrypt.hash(userDto.password, 0);
    }

    return this.userRepo.save(user);
  }
}
