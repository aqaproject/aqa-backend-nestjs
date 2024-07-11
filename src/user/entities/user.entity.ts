import { Field, ObjectType } from '@nestjs/graphql';
import { Faculty } from 'src/faculty/entities/faculty.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';

@ObjectType()
@Entity()
export class UserEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Role)
  @Column({ type: 'enum', enum: Object.values(Role) })
  role: string;

  @Field(() => String)
  @Column({ default: '', nullable: true })
  displayName: string;

  @Field(() => String)
  @Column()
  username: string;

  @ManyToOne(() => Faculty, { nullable: true })
  faculty?: Faculty;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  lastAccess: Date;
}
