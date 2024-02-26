import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { paginateByQuery } from 'src/common/utils/paginate';
import { Repository } from 'typeorm';
import { Criteria } from './entities/criteria.entity';
import { searchString } from 'src/common/utils/searchString';

@Injectable()
export class CriteriaService {
  constructor(@InjectRepository(Criteria) private repo: Repository<Criteria>) {}

  async findAll(filter: FilterArgs, paginationOptions: PaginationArgs) {
    return paginateByQuery(
      this.repo.createQueryBuilder().where(searchString('Criteria', filter)),
      paginationOptions,
      filter,
      {
        relations: { semester: true },
      },
    );
  }

  findOne(id: string): Promise<Criteria> {
    return this.repo.findOne({
      where: { criteria_id: id },
      relations: { semester: true },
    });
  }
}
