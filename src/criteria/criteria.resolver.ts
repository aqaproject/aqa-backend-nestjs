import { Args, Query, Resolver } from '@nestjs/graphql';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { CriteriaService } from './criteria.service';
import { PaginatedCriteria } from './dto/PaginatedCriteria.dto';
import { Criteria } from './entities/criteria.entity';

@Resolver(() => Criteria)
export class CriteriaResolver {
  constructor(private readonly criteriaService: CriteriaService) {}
  @Query(() => PaginatedCriteria, { name: 'criteria' })
  findAll(@Args() filter: FilterArgs, @Args() pagination: PaginationArgs) {
    return this.criteriaService.findAll(filter, pagination);
  }

  @Query(() => Criteria, { name: 'criterion' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.criteriaService.findOne(id);
  }
}
