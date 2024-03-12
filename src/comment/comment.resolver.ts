import { Args, Query, Resolver } from '@nestjs/graphql';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { CommentService } from './comment.service';
import { CommentQuantity } from './dto/CommentQuantity.dto';
import { PaginatedComment } from './dto/PaginatedComment';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => PaginatedComment, {
    name: 'comments',
    description: 'List all comments',
  })
  findAll(@Args() filter: FilterArgs, @Args() pagination: PaginationArgs) {
    return this.commentService.findAll(filter, pagination);
  }

  @Query(() => CommentQuantity, { name: 'commentQuantity' })
  commenQuantity(@Args() filter: FilterArgs, @Args('type') type: string) {
    return this.commentService.getQuantity(filter, type);
  }

  @Query(() => Comment, {
    name: 'comment',
    description: 'View particular comment information',
    nullable: true,
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.commentService.findOne(id);
  }
}
