import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { filterQuery } from 'src/common/utils/filterQuery';
import { paginateByQuery } from 'src/common/utils/paginate';
import { FindOptionsRelations, Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { BaseService } from 'src/common/services/BaseService';

@Injectable()
export class ClassService extends BaseService<Class> {
  constructor(@InjectRepository(Class) private repo: Repository<Class>) {
    super();
  }

  relations: FindOptionsRelations<Class> = {
    lecturer: true,
    semester: true,
    subject: {
      faculty: true,
    },
  };

  async findAll(filter: FilterArgs, paginationOptions: PaginationArgs) {
    return paginateByQuery(
      filterQuery<Class>(
        'Class',
        this.repo.createQueryBuilder().innerJoin('Class.subject', 'Subject'),
        filter,
      ),
      paginationOptions,
      filter,
      {
        relations: this.relations,
      },
    );
  }

  findOne(id: string): Promise<Class> {
    return this.repo.findOne({
      where: { class_id: id },
      relations: this.relations,
    });
  }
}
