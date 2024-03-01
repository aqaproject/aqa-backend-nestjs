import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { paginateByQuery } from 'src/common/utils/paginate';
import { Repository } from 'typeorm';
import { Criteria } from './entities/criteria.entity';
import { searchString } from 'src/common/utils/searchString';
import { BaseService } from 'src/common/services/BaseService';

@Injectable()
export class CriteriaService extends BaseService<Criteria> {
  constructor(@InjectRepository(Criteria) private repo: Repository<Criteria>) {
    super();
  }

  relations = { semester: true };

  async findAll(filter: FilterArgs, paginationOptions: PaginationArgs) {
    return paginateByQuery(
      this.repo.createQueryBuilder().where(searchString('Criteria', filter)),
      paginationOptions,
      filter,
      {
        relations: this.relations,
      },
    );
  }

  findOne(id: string): Promise<Criteria> {
    return this.repo.findOne({
      where: { criteria_id: id },
      relations: this.relations,
    });
  }
}
