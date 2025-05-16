import { ArgsType, Field } from '@nestjs/graphql';
import { StaffSurveyPointDTO } from './staff-survey-point.dto';

@ArgsType()
export class StaffSurveySheetDTO {
  @Field({
    nullable: true,
  })
  survey_name: string;

  @Field({ nullable: true })
  display_name: string;

  @Field({ nullable: true })
  mscb: string;

  @Field({ nullable: true })
  birth: string;

  @Field({ nullable: true })
  gender: boolean;

  @Field({ nullable: true })
  faculty: boolean;

  @Field({ nullable: true })
  academic_degree: string;

  @Field({ nullable: true })
  academic_title: string;

  @Field({ nullable: true })
  additional_comment: string;

  @Field(() => [StaffSurveyPointDTO], { nullable: false })
  points: StaffSurveyPointDTO[];
}
