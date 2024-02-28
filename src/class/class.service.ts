import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { filterQuery } from 'src/common/utils/filterQuery';
import { paginateByQuery } from 'src/common/utils/paginate';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService {
  constructor(@InjectRepository(Class) private repo: Repository<Class>) {}

  async findAll(filter: FilterArgs, paginationOptions: PaginationArgs) {
    return paginateByQuery(
      filterQuery<Class>(
        'Class',
        this.repo.createQueryBuilder().innerJoin('Class.subject', 'subject'),
        filter,
      ),
      paginationOptions,
      filter,
      {
        relations: {
          lecturer: true,
          semester: true,
          subject: {
            faculty: true,
          },
        },
      },
    );
  }

  findOne(id: string): Promise<Class> {
    return this.repo.findOne({
      where: { class_id: id },
      relations: { lecturer: true, semester: true, subject: true },
    });
  }
}
