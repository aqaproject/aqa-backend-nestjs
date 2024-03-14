import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from './entities/faculty.entity';
import { FindOptionsRelations, ILike, Repository } from 'typeorm';
import { paginate } from 'src/common/utils/paginate';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { BaseService } from 'src/common/services/BaseService';

@Injectable()
export class FacultyService extends BaseService<Faculty> {
  constructor(@InjectRepository(Faculty) private repo: Repository<Faculty>) {
    super();
  }

  relations: FindOptionsRelations<Faculty> = { lecturers: true };

  async findAll(filter: FilterArgs, paginationOptions: PaginationArgs) {
    return paginate(this.repo, paginationOptions, {
      where: { display_name: ILike(`%${filter.keyword}%`) },
    });
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { faculty_id: id },
    });
  }
}
