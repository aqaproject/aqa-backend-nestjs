import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { filterQuery } from 'src/common/utils/filterQuery';
import { paginateByQuery } from 'src/common/utils/paginate';
import { Repository } from 'typeorm';
import { Point } from './entities/point.entity';

@Injectable()
export class PointService {
  constructor(@InjectRepository(Point) private repo: Repository<Point>) {}

  findAll(
    filter: FilterArgs,
    paginationOptions: PaginationArgs,
    groupEntity: 'Subject' | 'Lecturer' | 'Faculty',
  ) {
    return paginateByQuery(
      filterQuery<Point>(
        'Point',
        this.repo
          .createQueryBuilder()
          .innerJoin('Point.class', 'Class')
          .innerJoin('Class.subject', 'Subject')
          .innerJoin('Class.semester', 'Semester'),
        filter,
      )
        .select([
          'AVG(Point.point / Point.max_point) AS average_point',
          `${groupEntity}.${groupEntity.toLowerCase()}_id as id`,
        ])
        .andWhere('Point.max_point != 0')
        .groupBy(`${groupEntity}.${groupEntity.toLowerCase()}_id`),
      paginationOptions,
      filter,
      {},
    );
  }
}

// function goiAPI(callback) {
//   // goi API
//   .....

//   callback();
// }

// function thucHienSauKhiLamXong() {
//   console.log("Xong")
// }

// goiAPI()
