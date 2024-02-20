import { Args, Query, Resolver } from '@nestjs/graphql';
import { Faculty } from './entities/faculty.entity';
import { FacultyService } from './faculty.service';

@Resolver(() => Faculty)
export class FacultyResolver {
  constructor(private readonly facultyService: FacultyService) {}

  @Query(() => [Faculty], { name: 'faculty' })
  findAll() {
    return this.facultyService.findAll();
  }

  @Query(() => Faculty, { name: 'faculty' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.facultyService.findOne(id);
  }
}
