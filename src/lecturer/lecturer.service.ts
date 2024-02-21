import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { paginate } from 'src/common/utils/paginate';
import { ILike, Repository } from 'typeorm';
import { Lecturer } from './entities/lecturer.entity';

@Injectable()
export class LecturerService {
  constructor(@InjectRepository(Lecturer) private repo: Repository<Lecturer>) {}

  async findAll(filter: FilterArgs, paginationOptions: PaginationArgs) {
    return paginate(this.repo, paginationOptions, {
      where: { display_name: ILike(`%${filter.keyword}%`) },
      relations: { faculty: true },
    });
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
