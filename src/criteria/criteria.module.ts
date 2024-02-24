import { Module } from '@nestjs/common';
import { CriteriaService } from './criteria.service';
import { CriteriaResolver } from './criteria.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Criteria } from './entities/criteria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Criteria])],
  providers: [CriteriaResolver, CriteriaService],
})
export class CriteriaModule {}
