import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { Role } from '../enums/role.enum';
import { Injectable } from '@nestjs/common';

@ObjectType()
@Entity()
export class UserEntity {
  @Field(() => UUID)
  @PrimaryGeneratedColumn()
  id: UUID;

  @Field(() => Role)
  @Column()
  role: Role;

  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column()
  password: string;
}
