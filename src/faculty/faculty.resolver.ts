import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Faculty } from './entities/faculty.entity';
import { FacultyService } from './faculty.service';
import { PaginatedFaculty } from './dto/PaginatedFaculty';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginatedLecturer } from 'src/lecturer/dto/PaginatedLecturer';
import { QueryArgs } from 'src/common/args/query.arg';
import { LecturerService } from 'src/lecturer/lecturer.service';
import { PaginatedSubject } from 'src/subject/dto/PaginatedSubject';
import { SubjectService } from 'src/subject/subject.service';

@Resolver(() => Faculty)
export class FacultyResolver {
  constructor(
    private readonly facultyService: FacultyService,
    private readonly lecturerService: LecturerService,
    private readonly subjectService: SubjectService,
  ) {}

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

  @ResolveField(() => PaginatedLecturer)
  async lecturers(@Parent() faculty: Faculty, @Args() queryArgs: QueryArgs) {
    return this.lecturerService.findAll({
      ...queryArgs,
      filter: { ...queryArgs.filter, faculty_id: faculty.faculty_id },
    });
  }

  @ResolveField(() => PaginatedSubject)
  async subjects(@Parent() faculty: Faculty, @Args() queryArgs: QueryArgs) {
    return this.subjectService.findAll({
      ...queryArgs,
      filter: { ...queryArgs.filter, faculty_id: faculty.faculty_id },
    });
  }
}
