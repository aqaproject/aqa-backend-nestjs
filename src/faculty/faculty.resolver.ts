import { Args, Query, Resolver } from '@nestjs/graphql';
import { Faculty } from './entities/faculty.entity';
import { FacultyService } from './faculty.service';

@Resolver(() => Faculty)
export class FacultyResolver {
  constructor(private readonly facultyService: FacultyService) {}

  @Query(() => [Faculty], {
    name: 'faculties',
    description: 'List all faculty available',
  })
  findAll() {
    return this.facultyService.findAll();
  }

  @Query(() => Faculty, {
    name: 'faculty',
    description: 'Get detail information of a faculty and its lecturer list',
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.facultyService.findOne(id);
  }
}
