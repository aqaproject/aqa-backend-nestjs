import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectResolver } from './subject.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { PointModule } from 'src/point/point.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), PointModule],
  providers: [SubjectResolver, SubjectService],
})
export class SubjectModule {}
