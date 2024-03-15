import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TotalPoint {
  @Field(() => Float)
  average_point: number;

  @Field(() => Float)
  point: number;

  @Field(() => Float)
  max_point: number;

  @Field(() => Int)
  class_num: number;
}
