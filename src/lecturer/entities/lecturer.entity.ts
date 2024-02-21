import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Class } from 'src/class/entities/class.entity';
import { Faculty } from 'src/faculty/entities/faculty.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity()
export class Lecturer {
  @PrimaryColumn()
  @Field()
  lecturer_id: string;

  @Column()
  @Field({ nullable: true })
  display_name: string;

  @Column()
  @Field(() => Int, { nullable: true })
  mscb: string;

  @Column()
  @Field({ nullable: true })
  faculty_id: string;

  @ManyToOne(() => Faculty, (faculty) => faculty.lecturers)
  @JoinColumn({ name: 'faculty_id' })
  @Field(() => Faculty, { nullable: true })
  faculty: Faculty;

  @Column()
  @Field({ nullable: true })
  username: string;

  @Column()
  @Field({ nullable: true })
  learning_position: string;

  @Column()
  @Field({ nullable: true })
  birth_date: Date;

  @Column()
  @Field(() => Boolean, { nullable: true })
  gender: boolean;

  @Column()
  @Field({ nullable: true })
  learning: string;

  @Column()
  @Field({ nullable: true })
  email: string;

  @Column()
  @Field({ nullable: true })
  phone: string;

  @Column()
  @Field({ nullable: true })
  ngach: string;

  @Column()
  @Field({ nullable: true })
  position: string;

  @OneToMany(() => Class, (class_) => class_.lecturer)
  @Field(() => [Class], { nullable: true })
  classes: Class[];
}
