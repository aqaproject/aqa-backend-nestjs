import { Args, Query, Resolver } from '@nestjs/graphql';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { PaginatedSubject } from './dto/PaginatedSubject';
import { Subject } from './entities/subject.entity';
import { SubjectService } from './subject.service';
import { FindAllArgs } from './args/find-all.args';

@Resolver(() => Subject)
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

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
}
