import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { BaseService } from 'src/common/services/BaseService';
import { filterQuery } from 'src/common/utils/filterQuery';
import { paginateByQuery } from 'src/common/utils/paginate';
import { FindOptionsRelations, Repository } from 'typeorm';
import { FindAllArgs } from './args/find-all.args';
import { Subject } from './entities/subject.entity';
import { Class } from 'src/class/entities/class.entity';
import { Point } from 'src/point/entities/point.entity';

@Injectable()
export class SubjectService extends BaseService<Subject> {
  constructor(@InjectRepository(Subject) private repo: Repository<Subject>) {
    super();
  }

  relations: FindOptionsRelations<Subject> = { faculty: true };

  async findAll(
    filter: FilterArgs,
    subjectFilter: FindAllArgs,
    paginationOptions: PaginationArgs,
  ) {
    return paginateByQuery(
      filterQuery<Subject>(
        'Subject',
        this.repo
          .createQueryBuilder()
          .leftJoin(Class, 'Class', 'Class.subject_id = Subject.subject_id')
          .leftJoin(Point, 'Point', 'Point.class_id = Class.class_id')
          .innerJoin('Class.semester', 'Semester'),
        filter,
      )
        .select('Subject.subject_id', 'subject_id')
        .addSelect('Subject.display_name', 'display_name')
        .addSelect('Subject.faculty_id', 'faculty_id')
        .addSelect('AVG(Point.point / Point.max_point)', 'total_point')
        .andWhere('Point.max_point != 0')
        .addOrderBy(
          subjectFilter.filter_field == 'point'
            ? 'total_point'
            : 'Subject.display_name',
          subjectFilter.sort,
        )
        .addGroupBy('Subject.subject_id'),
      paginationOptions,
      filter,
      { isRaw: true },
    );
  }

  findOne(id: string): Promise<Subject> {
    return this.repo.findOne({
      where: { subject_id: id },
      relations: this.relations,
    });
  }
}
