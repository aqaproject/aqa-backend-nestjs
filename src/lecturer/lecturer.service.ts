import { Injectable } from '@nestjs/common';
import { Lecturer } from './entities/lecturer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LecturerService {
  constructor(@InjectRepository(Lecturer) private repo: Repository<Lecturer>) {}

  findAll() {
    return `This action returns all lecturer`;
  }

  findOne(id: string): Promise<Lecturer> {
    return this.repo.findOne({
      where: { lecturer_id: id },
      relations: {
        faculty: true,
      },
    });
  }
}
