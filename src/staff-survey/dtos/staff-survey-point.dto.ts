import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class StaffSurveyPointDTO {
  @Field(() => Int)
  max_point: number;

  @Field(() => Int)
  point: number;

  @Field({ nullable: true })
  comment: string;

  @Field({ nullable: true })
  criteria_name: string;

  @Field({ nullable: true })
  criteria_category: string;

  @Field(() => Int, { nullable: true })
  criteria_index: number;
}
