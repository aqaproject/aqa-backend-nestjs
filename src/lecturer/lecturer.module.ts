import { Module } from '@nestjs/common';
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
    PointModule,
    FacultyModule,
    ClassModule,
  ],
  providers: [LecturerResolver, LecturerService],
})
export class LecturerModule {}
