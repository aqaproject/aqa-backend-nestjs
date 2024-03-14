import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryArgs } from 'src/common/args/query.arg';
import { ClassService } from './class.service';
import { PaginatedClass } from './dto/PaginatedClass';
import { Class } from './entities/class.entity';

@Resolver(() => Class)
export class ClassResolver {
  constructor(private readonly classService: ClassService) {}

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
}
