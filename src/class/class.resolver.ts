import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { QueryArgs } from 'src/common/args/query.arg';
import { ClassService } from './class.service';
import { PaginatedClass } from './dto/PaginatedClass';
import { Class } from './entities/class.entity';
import { GroupedPoint } from 'src/point/dto/PaginatedGroupedPoint';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PointService } from 'src/point/point.service';

@Resolver(() => Class)
export class ClassResolver {
  constructor(
    private readonly classService: ClassService,
    private readonly pointService: PointService,
  ) {}

  @Query(() => PaginatedClass, {
    name: 'classes',
    description: 'List all classes',
  })
  findAll(@Args() queryArgs: QueryArgs) {
    return this.classService.findAll(queryArgs);
  }

  @Query(() => Class, {
    name: 'class',
    description: 'View particular class information',
    nullable: true,
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.classService.findOne(id);
  }

  @ResolveField(() => [GroupedPoint])
  async points(@Parent() classItem: Class, @Args() filter: FilterArgs) {
    const { class_id } = classItem;
    const result = await this.pointService.findAll(
      { ...filter, class_id },
      { size: 100, page: 0 },
      'Criteria',
    );
    return result.data;
  }
}
