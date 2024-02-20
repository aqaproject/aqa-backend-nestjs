import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from './entities/faculty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacultyService {
  constructor(@InjectRepository(Faculty) private repo: Repository<Faculty>) {}

  findAll() {
    return `This action returns all faculty`;
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { faculty_id: id },
      relations: {
        lecturers: true,
      },
    });
  }
}
