import { Field, InputType } from '@nestjs/graphql';

import PaginationBasicInput from './PaginationBasicInput';

@InputType('PaginationSearchInput')
export default class PaginationSearchInput extends PaginationBasicInput {
  @Field(() => String, {
    description: 'Search by name, email or ID',
    nullable: true,
  })
  search?: string;

  @Field(() => String, {
    nullable: true,
    defaultValue: 'EN',
  })
  langID?: string;
}
