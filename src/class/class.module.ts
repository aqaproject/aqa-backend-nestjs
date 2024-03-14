import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassResolver } from './class.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { PointModule } from 'src/point/point.module';
import { SemesterModule } from 'src/semester/semester.module';

@Module({
  imports: [TypeOrmModule.forFeature([Class]), PointModule, SemesterModule],
  providers: [ClassResolver, ClassService],
  exports: [TypeOrmModule.forFeature([Class]), ClassService],
})
export class ClassModule {}
