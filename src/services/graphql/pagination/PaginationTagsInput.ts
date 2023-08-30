import { Field, InputType, Int } from '@nestjs/graphql';

import PaginationSearchInput from './PaginationSearchInput';

@InputType('PaginationTagsInput')
export default class PaginationTagsInput extends PaginationSearchInput {
  @Field(() => [Int], { nullable: true })
  tags?: number[];
}
