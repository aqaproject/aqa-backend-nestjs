import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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

  async findById(id: string) {
    return this.userRepo.findOneBy({ id });
  }
}
