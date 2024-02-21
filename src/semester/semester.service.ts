import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Semester } from './entities/semester.entity';

@Injectable()
export class SemesterService {
  constructor(@InjectRepository(Semester) private repo: Repository<Semester>) {}

  async findAll() {
    return this.repo.find();
  }
}
