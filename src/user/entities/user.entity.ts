import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class UserEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  role: string;

  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column()
  password: string;

}
