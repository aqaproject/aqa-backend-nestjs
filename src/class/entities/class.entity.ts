import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Lecturer } from 'src/lecturer/entities/lecturer.entity';
import { Semester } from 'src/semester/entities/semester.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'class' })
export class Class {
  @PrimaryColumn()
  @Field(() => String)
  class_id: string;

  @Column()
  @Field()
  display_name: string;

  @ManyToOne(() => Semester)
  @JoinColumn({ name: 'semester_id' })
  @Field(() => Semester)
  semester: Semester;

  @Column()
  @Field()
  program: string;

  @Column()
  @Field()
  class_type: string;

  @Field(() => Subject, { nullable: true })
  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.classes)
  @JoinColumn({ name: 'lecturer_id' })
  @Field(() => Lecturer, { nullable: true })
  lecturer: Lecturer;

  @Column()
  @Field(() => Int)
  total_student: number;

  @Column()
  @Field(() => Int)
  participating_student: number;
}
