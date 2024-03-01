import { Args, Query, Resolver } from '@nestjs/graphql';
import { Faculty } from './entities/faculty.entity';
import { FacultyService } from './faculty.service';
import { PaginatedFaculty } from './dto/PaginatedFaculty';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { FilterArgs } from 'src/common/args/filter.arg';

@Resolver(() => Faculty)
export class FacultyResolver {
  constructor(private readonly facultyService: FacultyService) {}

  @Query(() => PaginatedFaculty, {
    name: 'faculties',
    description: 'List all faculty available',
  })
  findAll(@Args() filter: FilterArgs, @Args() pagination: PaginationArgs) {
    return this.facultyService.findAll(filter, pagination);
  }

  @Query(() => Faculty, {
    name: 'faculty',
    description: 'Get detail information of a faculty and its lecturer list',
    nullable: true,
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.facultyService.findOne(id);
  }
}
