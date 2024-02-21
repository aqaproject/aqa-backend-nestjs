import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from './entities/faculty.entity';
import { ILike, Repository } from 'typeorm';
import { paginate } from 'src/common/utils/paginate';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';

@Injectable()
export class FacultyService {
  constructor(@InjectRepository(Faculty) private repo: Repository<Faculty>) {}

  async findAll(filter: FilterArgs, paginationOptions: PaginationArgs) {
    return paginate(this.repo, paginationOptions, {
      where: { display_name: ILike(`%${filter.keyword}%`) },
      relations: { lecturers: true },
    });
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
