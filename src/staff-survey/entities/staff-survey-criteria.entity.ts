import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class StaffSurveyCriteria {
  @Field()
  @PrimaryColumn('uuid', { default: () => 'uuid_generate_v4()' })
  staff_survery_criteria_id: string;

  @Field()
  @Column()
  display_name: string;

  @Field()
  @Column()
  category: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  index: number;

  @Field(() => [String], { defaultValue: [] })
  @Column({ type: 'text', array: true, default: () => "'{}'" })
  semesters: string[];
}
