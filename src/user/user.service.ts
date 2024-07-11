import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async create(user: UserDto): Promise<UserEntity> {
    if (await this.userRepo.findOneBy({ username: user.username })) {
      throw new ConflictException('Conflict');
    }
    user.password = await bcrypt.hash(user.password, 0);
    return this.userRepo.save({
      ...user,
      faculty: { faculty_id: user.facultyId },
    });
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

  async update(id: string, userDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepo.findOneBy({ id });

    Object.assign(user, userDto);
    if (userDto.password) {
      user.password = await bcrypt.hash(userDto.password, 0);
    }

    return this.userRepo.save({
      ...user,
      faculty: { faculty_id: userDto.facultyId },
    });
  }
}
