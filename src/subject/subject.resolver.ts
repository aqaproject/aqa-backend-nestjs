import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { PaginatedSubject } from './dto/PaginatedSubject';
import { Subject } from './entities/subject.entity';
import { SubjectService } from './subject.service';
import { FindAllArgs } from './args/find-all.args';
import { PointService } from 'src/point/point.service';
import { Point } from 'src/point/entities/point.entity';

@Resolver(() => Subject)
export class SubjectResolver {
  constructor(
    private readonly subjectService: SubjectService,
    private readonly pointService: PointService,
  ) {}

  @Query(() => PaginatedSubject, { name: 'subjects' })
  findAll(
    @Args() filter: FilterArgs,
    @Args() subjectFilter: FindAllArgs,
    @Args() pagination: PaginationArgs,
  ) {
    return this.subjectService.findAll(filter, subjectFilter, pagination);
  }

  @Query(() => Subject, { name: 'subject', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.subjectService.findOne(id);
  }

  @ResolveField(() => [Point])
  async points(
    @Parent() subject: Subject,
    @Args() filter: FilterArgs,
    @Args() pagination: PaginationArgs,
  ) {
    const { subject_id } = subject;
    return this.pointService.findAll(
      { ...filter, subject_id },
      pagination,
      'Subject',
    );
  }
}
