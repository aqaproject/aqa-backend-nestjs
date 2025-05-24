import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { StaffSurveySheetDTO } from './dtos/staff-survey-sheet.dto';
import { StaffSurveyBatch } from './entities/staff-survey-batch.entity';
import { StaffSurveyCriteria } from './entities/staff-survey-criteria.entity';
import { StaffSurveyPoint } from './entities/staff-survey-point.entity';
import { StaffSurveySheet } from './entities/staff-survey-sheet.entity';

@Injectable()
export class StaffSurveyService {
  constructor(
    @InjectRepository(StaffSurveySheet)
    private repo: Repository<StaffSurveySheet>,
    @InjectRepository(StaffSurveyBatch)
    private staffSurveyBatchRepo: Repository<StaffSurveyBatch>,
    @InjectRepository(StaffSurveyCriteria)
    private staffSurveyCriteriaRepo: Repository<StaffSurveyCriteria>,
    @InjectRepository(StaffSurveyPoint)
    private staffSurveyPointRepo: Repository<StaffSurveyPoint>,
  ) {}

  async create(inputData: StaffSurveySheetDTO) {
    const { survey_name: surveyName, points, ...data } = inputData;

    const batch = await this.getBatch(surveyName);

    const surveySheet = (
      await this.repo.insert({
        ...data,
        batch: {
          staff_survey_batch_id: batch.staff_survey_batch_id,
        },
      })
    ).identifiers[0] as StaffSurveySheet;

    await Promise.all(
      points.map(async (_point) => {
        const point = { ..._point };
        const criteria = await this.getCriteria(point);

        return await this.staffSurveyPointRepo.insert({
          ...point,
          sheet: {
            staff_survey_sheet_id: surveySheet.staff_survey_sheet_id,
          },
          criteria,
        });
      }),
    );

    return surveySheet;
  }

  async getCriteria({
    criteria_name,
    criteria_category,
    criteria_index,
  }: {
    criteria_name: string;
    criteria_category: string;
    criteria_index: number;
  }) {
    let criteria = await this.staffSurveyCriteriaRepo.findOne({
      where: {
        display_name: criteria_name,
        category: criteria_category,
      },
    });

    if (!criteria) {
      const criteriaData = this.staffSurveyCriteriaRepo.create({
        display_name: criteria_name,
        category: criteria_category,
        index: criteria_index,
      });

      try {
        criteria = await this.staffSurveyCriteriaRepo.save(criteriaData);
        console.log({ criteria });
      } catch (error) {
        console.error('Error saving criteria:', error);
        return await this.staffSurveyCriteriaRepo.findOne({
          where: {
            display_name: criteria_name,
            category: criteria_category,
          },
        });
      }
    }

    return criteria;
  }

  async getBatch(surveyName: string) {
    const batchName =
      surveyName ||
      `Khảo sát CBNV (Upload ${moment().format('HH:mm, DD-MM-YYYY')})`;

    let batch = await this.staffSurveyBatchRepo.findOne({
      where: {
        display_name: batchName,
      },
    });

    if (!batch) {
      const batchData = this.staffSurveyBatchRepo.create({
        display_name: batchName,
        updated_at: new Date(),
      });
      try {
        batch = await this.staffSurveyBatchRepo.save(batchData);
      } catch (error) {
        return await this.staffSurveyBatchRepo.findOne({
          where: {
            display_name: batchName,
          },
        });
      }
    }

    return batch;
  }
}
