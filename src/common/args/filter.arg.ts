import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FilterArgs {
  @Field({ nullable: true })
  semester_id: string;

  @Field({ nullable: true })
  faculty_id: string;

  @Field({ nullable: true })
  program: string;

  @Field({ nullable: true, defaultValue: '' })
  keyword: string;

  //   @Field(() => Boolean, { nullable: true, defaultValue: false })
  //   matchCase: boolean;

  //   @Field(() => Boolean, { nullable: true, defaultValue: false })
  //   matchWholeWord: boolean;
}
