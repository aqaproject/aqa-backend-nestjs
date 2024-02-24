import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { ILike, Repository } from 'typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { paginate } from 'src/common/utils/paginate';

@Injectable()
export class SubjectService {
  constructor(@InjectRepository(Subject) private repo: Repository<Subject>) {}

  async findAll(filter: FilterArgs, paginationOptions: PaginationArgs) {
    return paginate(this.repo, paginationOptions, {
      where: { display_name: ILike(`%${filter.keyword}%`) },
      relations: { faculty: true },
    });
  }

  findOne(id: string): Promise<Subject> {
    return this.repo.findOne({
      where: { subject_id: id },
      relations: {
        faculty: true,
      },
    });
  }
}
