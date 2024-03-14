import { Field, ObjectType } from '@nestjs/graphql';
import { Faculty } from 'src/faculty/entities/faculty.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Subject {
  @Field()
  @PrimaryColumn()
  subject_id: string;

  @Field()
  @Column({ nullable: true })
  display_name: string;

  @Field()
  @Column()
  faculty_id: string;

  @Field(() => Faculty, { nullable: true })
  @ManyToOne(() => Faculty)
  @JoinColumn({ name: 'faculty_id' })
  faculty: Faculty;

  @Field({ nullable: true })
  total_point: number;
}
