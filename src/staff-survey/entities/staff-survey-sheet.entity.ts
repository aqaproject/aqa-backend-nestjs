import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class StaffSurveySheet {
  @Field()
  @PrimaryColumn()
  staff_survey_sheet_id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  display_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  mscb: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birth: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'boolean' })
  gender: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'boolean' })
  faculty: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  academic_degree: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  academic_title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  additional_comment: string;
}
