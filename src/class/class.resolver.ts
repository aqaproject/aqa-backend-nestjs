import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClassService } from './class.service';
import { Class } from './entities/class.entity';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginatedClass } from './dto/PaginatedClass';

@Resolver(() => Class)
export class ClassResolver {
  constructor(private readonly classService: ClassService) {}

  @Query(() => PaginatedClass, {
    name: 'classes',
    description: 'List all classes',
  })
  findAll(@Args() filter: FilterArgs, @Args() pagination: PaginationArgs) {
    return this.classService.findAll(filter, pagination);
  }

  @Query(() => Class, {
    name: 'class',
    description: 'View particular class information',
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.classService.findOne(id);
  }
}
