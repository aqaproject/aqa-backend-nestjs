import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';

@ObjectType()
@Entity()
export class UserEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => Role)
  @Column()
  role: string;

  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column()
  password: string;
}
