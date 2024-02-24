import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Semester } from 'src/semester/entities/semester.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Criteria {
  @Field()
  @PrimaryColumn()
  criteria_id: string;

  @Field()
  @Column()
  display_name: string;

  @Field(() => Int, { nullable: true })
  @Column()
  index: number;

  @Field(() => Semester, { nullable: true })
  @ManyToOne(() => Semester)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;
}
