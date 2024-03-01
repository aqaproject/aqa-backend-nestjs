import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { paginate } from 'src/common/utils/paginate';
import { FindOptionsRelations, ILike, Repository } from 'typeorm';
import { Lecturer } from './entities/lecturer.entity';
import { BaseService } from 'src/common/services/BaseService';

@Injectable()
export class LecturerService extends BaseService<Lecturer> {
  constructor(@InjectRepository(Lecturer) private repo: Repository<Lecturer>) {
    super();
  }

  relations: FindOptionsRelations<Lecturer> = {
    faculty: true,
  };

  async findAll(filter: FilterArgs, paginationOptions: PaginationArgs) {
    return paginate(this.repo, paginationOptions, {
      where: { display_name: ILike(`%${filter.keyword}%`) },
      relations: this.relations,
    });
  }

  findOne(id: string): Promise<Lecturer> {
    return this.repo.findOne({
      where: { lecturer_id: id },
      relations: this.relations,
    });
  }
}
