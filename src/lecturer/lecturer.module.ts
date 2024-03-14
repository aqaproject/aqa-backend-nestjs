import { Module, forwardRef } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { LecturerResolver } from './lecturer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecturer } from './entities/lecturer.entity';
import { PointModule } from 'src/point/point.module';
import { FacultyModule } from 'src/faculty/faculty.module';
import { ClassModule } from 'src/class/class.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecturer]),
    forwardRef(() => FacultyModule),
    PointModule,
    ClassModule,
  ],
  providers: [LecturerResolver, LecturerService],
  exports: [LecturerService],
})
export class LecturerModule {}
