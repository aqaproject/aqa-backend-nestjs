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
  @Column()
  display_name: string;

  @Field(() => Faculty)
  @ManyToOne(() => Faculty)
  @JoinColumn({ name: 'faculty_id' })
  faculty: Faculty;
}
