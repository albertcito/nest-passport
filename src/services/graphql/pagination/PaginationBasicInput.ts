import { IsIn, Max, Min } from 'class-validator';
import { Field, Int, InputType } from '@nestjs/graphql';

@InputType('PaginationBasicInput')
export default class PaginationBasicInput {
  @Min(1)
  @Field(() => Int, { defaultValue: 1, nullable: true })
  page = 1;

  @Min(1)
  @Max(200)
  @Field(() => Int, { defaultValue: 10, nullable: true })
  limit = 10;

  @IsIn(['ASC', 'DESC'])
  @Field(() => String, {
    nullable: true,
    defaultValue: 'DESC',
    description: 'ASC or DESC',
  })
  order: 'ASC' | 'DESC' = 'DESC';
}
