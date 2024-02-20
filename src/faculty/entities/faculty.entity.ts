import { Field, ObjectType } from '@nestjs/graphql';
import { Lecturer } from 'src/lecturer/entities/lecturer.entity';
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

  @OneToMany(() => Lecturer, (lecturer) => lecturer.faculty, { eager: true })
  @Field(() => [Lecturer], { nullable: true })
  lecturers: Lecturer[];
}
