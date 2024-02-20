import { ObjectType, Field } from '@nestjs/graphql';
import { Faculty } from 'src/faculty/entities/faculty.entity';
import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Lecturer {
  @PrimaryColumn()
  @Field()
  lecturer_id: string;

  @Column()
  @Field()
  display_name: string;

  @Column()
  @Field()
  mscb: string;

  @ManyToOne(() => Faculty, (faculty) => faculty.lecturers)
  @JoinColumn({ name: 'faculty_id' })
  @Field(() => Faculty)
  faculty: Faculty;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  learning_position: string;

  @Column()
  @Field()
  birth_date: Date;
}
