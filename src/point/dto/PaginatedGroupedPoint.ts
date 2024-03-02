import { Field, ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/dto/Paginated.dto';

@ObjectType()
export class GroupedPoint {
  @Field()
  average_point: number;

  @Field()
  id: string;
}

@ObjectType()
export class PaginatedGroupedPoint extends Paginated(GroupedPoint) {}
