import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { paginate } from 'src/common/utils/paginate';
import { ILike, Repository } from 'typeorm';
import { Criteria } from './entities/criteria.entity';

@Injectable()
export class CriteriaService {
  constructor(@InjectRepository(Criteria) private repo: Repository<Criteria>) {}

  async findAll(filter: FilterArgs, paginationOptions: PaginationArgs) {
    return paginate(this.repo, paginationOptions, {
      where: { display_name: ILike(`%${filter.keyword}%`) },
      relations: { semester: true },
    });
  }

  findOne(id: string): Promise<Criteria> {
    return this.repo.findOne({
      where: { criteria_id: id },
      relations: { semester: true },
    });
  }
}
