import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { ILike, Repository } from 'typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { paginate } from 'src/common/utils/paginate';

@Injectable()
export class ClassService {
  constructor(@InjectRepository(Class) private repo: Repository<Class>) {}

  async findAll(filter: FilterArgs, paginationOptions: PaginationArgs) {
    return paginate(this.repo, paginationOptions, {
      where: { display_name: ILike(`%${filter.keyword}%`) },
      relations: { lecturer: true, semester: true },
    });
  }

  findOne(id: string): Promise<Class> {
    return this.repo.findOne({
      where: { class_id: id },
      relations: { lecturer: true, semester: true },
    });
  }
}
