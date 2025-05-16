import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class StaffSurveyBatch {
  @Field()
  @PrimaryColumn('uuid', { default: () => 'uuid_generate_v4()' })
  staff_survey_batch_id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  display_name: string;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true, type: 'timestamptz' })
  updated_at: Date;
}
