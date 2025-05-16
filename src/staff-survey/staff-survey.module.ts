import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffSurveySheet } from './entities/staff-survey-sheet.entity';
import { StaffSurveyCriteria } from './entities/staff-survey-criteria.entity';
import { StaffSurveyPoint } from './entities/staff-survey-point.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StaffSurveySheet,
      StaffSurveyCriteria,
      StaffSurveyPoint,
    ]),
  ],
  providers: [],
  exports: [],
})
export class StaffSurveyModule {}
