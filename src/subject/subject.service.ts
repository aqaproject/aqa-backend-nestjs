import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { FindOptionsRelations, ILike, Repository } from 'typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { paginate } from 'src/common/utils/paginate';
import { BaseService } from 'src/common/services/BaseService';

@Injectable()
export class SubjectService extends BaseService<Subject> {
  constructor(@InjectRepository(Subject) private repo: Repository<Subject>) {
    super();
  }

  relations: FindOptionsRelations<Subject> = { faculty: true };

  async findAll(filter: FilterArgs, paginationOptions: PaginationArgs) {
    return paginate(this.repo, paginationOptions, {
      where: { display_name: ILike(`%${filter.keyword}%`) },
      relations: this.relations,
    });
  }

  findOne(id: string): Promise<Subject> {
    return this.repo.findOne({
      where: { subject_id: id },
      relations: this.relations,
    });
  }
}
