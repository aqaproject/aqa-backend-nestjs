import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassResolver } from './class.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class])],
  providers: [ClassResolver, ClassService],
  exports: [TypeOrmModule.forFeature([Class]), ClassService],
})
export class ClassModule {}
