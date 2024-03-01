import { Args, Query, Resolver } from '@nestjs/graphql';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { PaginatedLecturer } from './dto/PaginatedLecturer';
import { Lecturer } from './entities/lecturer.entity';
import { LecturerService } from './lecturer.service';

@Resolver(() => Lecturer)
export class LecturerResolver {
  constructor(private readonly lecturerService: LecturerService) {}

  @Query(() => PaginatedLecturer, {
    name: 'lecturers',
    description: 'List all lecturer',
  })
  findAll(@Args() filter: FilterArgs, @Args() pagination: PaginationArgs) {
    return this.lecturerService.findAll(filter, pagination);
  }

  @Query(() => Lecturer, {
    name: 'lecturer',
    description: 'View detail information of a specific lecturer',
    nullable: true,
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.lecturerService.findOne(id);
  }
}
