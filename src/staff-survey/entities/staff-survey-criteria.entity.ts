import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Semester } from 'src/semester/entities/semester.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

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

  @ManyToOne(() => Semester)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  @Column({ nullable: true })
  semester_id: string;
}
