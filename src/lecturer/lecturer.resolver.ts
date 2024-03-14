import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { QueryArgs } from 'src/common/args/query.arg';
import { PaginatedLecturer } from './dto/PaginatedLecturer';
import { Lecturer } from './entities/lecturer.entity';
import { LecturerService } from './lecturer.service';
import { GroupedPoint } from 'src/point/dto/PaginatedGroupedPoint';
import { FilterArgs } from 'src/common/args/filter.arg';
import { FacultyService } from 'src/faculty/faculty.service';
import { PointService } from 'src/point/point.service';
import { Faculty } from 'src/faculty/entities/faculty.entity';

@Resolver(() => Lecturer)
export class LecturerResolver {
  constructor(
    private readonly lecturerService: LecturerService,
    private readonly pointService: PointService,
    private readonly facultyService: FacultyService,
  ) {}

  @Query(() => PaginatedLecturer, {
    name: 'lecturers',
    description: 'List all lecturer',
  })
  findAll(@Args() queryArgs: QueryArgs) {
    return this.lecturerService.findAll(queryArgs);
  }

  @Query(() => Lecturer, {
    name: 'lecturer',
    description: 'View detail information of a specific lecturer',
    nullable: true,
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.lecturerService.findOne(id);
  }

  @ResolveField(() => [GroupedPoint])
  async points(@Parent() lecturer: Lecturer, @Args() filter: FilterArgs) {
    const { lecturer_id } = lecturer;
    const result = await this.pointService.findAll(
      { ...filter, lecturer_id },
      { size: 100, page: 0 },
      'Criteria',
    );
    return result.data;
  }

  @ResolveField(() => Faculty)
  async faculty(@Parent() lecturer: Lecturer) {
    const { faculty_id } = lecturer;
    return this.facultyService.findOne(faculty_id);
  }
}
