import { Module } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { LecturerResolver } from './lecturer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecturer } from './entities/lecturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lecturer])],
  providers: [LecturerResolver, LecturerService],
})
export class LecturerModule {}
