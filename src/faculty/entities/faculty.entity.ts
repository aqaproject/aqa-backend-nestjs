import { Field, ObjectType } from '@nestjs/graphql';
import { TotalPoint } from 'src/common/dto/total-point.dto';
import { Lecturer } from 'src/lecturer/entities/lecturer.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Faculty {
  @PrimaryColumn()
  @Field(() => String)
  faculty_id: string;

  @Column()
  @Field()
  display_name: string;

  @Column()
  @Field({ nullable: true })
  full_name: string;

  @OneToMany(() => Lecturer, (lecturer) => lecturer.faculty)
  lecturers: Lecturer[];

  @OneToMany(() => Subject, (subject) => subject.faculty)
  subjects: Subject[];

  @Field(() => TotalPoint, { nullable: true })
  total_point: TotalPoint;
}
