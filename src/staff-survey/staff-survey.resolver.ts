import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StaffSurveySheet } from './entities/staff-survey-sheet.entity';
import { StaffSurveyService } from './staff-survey.service';
import { StaffSurveySheetDTO } from './dtos/staff-survey-sheet.dto';

@Resolver(() => StaffSurveySheet)
export class StaffSurveyResolver {
  constructor(private readonly staffSurveyService: StaffSurveyService) {}

  @Mutation(() => StaffSurveySheet, {
    name: 'addNewStaffSurveyData',
    description: 'Add new staff survey data',
  })
  async create(
    @Args('data', { type: () => StaffSurveySheetDTO })
    data: StaffSurveySheetDTO,
  ) {
    return await this.staffSurveyService.create(data);
  }

  @Mutation(() => [StaffSurveySheet], {
    name: 'addListStaffSurveyData',
    description: 'Add new staff survey data',
  })
  async createList(
    @Args('data', { type: () => [StaffSurveySheetDTO] })
    data: StaffSurveySheetDTO[],
  ) {
    return await Promise.all(
      data.map((item) => this.staffSurveyService.create(item)),
    );
  }
}
