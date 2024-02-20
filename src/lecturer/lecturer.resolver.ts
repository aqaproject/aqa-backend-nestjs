import { Args, Query, Resolver } from '@nestjs/graphql';
import { Lecturer } from './entities/lecturer.entity';
import { LecturerService } from './lecturer.service';

@Resolver(() => Lecturer)
export class LecturerResolver {
  constructor(private readonly lecturerService: LecturerService) {}

  @Query(() => [Lecturer], { name: 'lecturers' })
  findAll() {
    return this.lecturerService.findAll();
  }

  @Query(() => Lecturer, { name: 'lecturer' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.lecturerService.findOne(id);
  }
}
