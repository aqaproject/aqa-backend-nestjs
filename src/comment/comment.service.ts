import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { filterQuery } from 'src/common/utils/filterQuery';
import { paginateByQuery } from 'src/common/utils/paginate';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  findAll(filter: FilterArgs, paginationOptions: PaginationArgs) {
    return paginateByQuery(
      filterQuery<Comment>(
        'Comment',
        this.repo
          .createQueryBuilder()
          .innerJoin('Comment.class', 'Class')
          .innerJoin('Class.subject', 'Subject')
          .innerJoin('Class.semester', 'Semester'),
        filter,
      ),
      paginationOptions,
      filter,
      {
        relations: {
          class: true,
        },
      },
    );
  }

  getQuantity(filter: FilterArgs, type: string) {
    return {
      type,
      quantity: filterQuery<Comment>(
        'Comment',
        this.repo
          .createQueryBuilder()
          .innerJoin('Comment.class', 'Class')
          .innerJoin('Class.subject', 'Subject')
          .innerJoin('Class.semester', 'Semester'),
        filter,
      )
        .andWhere('Comment.type = :type', { type })
        .getCount(),
    };
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { comment_id: id }, relations: {} });
  }
}
