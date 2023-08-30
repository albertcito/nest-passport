import { ObjectType, Field } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

import Pagination from './Pagination';

export interface PaginatedResponse<TItem> {
  data: TItem[];
  pagination: Pagination;
}

export default function PaginationResponse<TItem>(TItemClass: Type<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass implements PaginatedResponse<TItem> {
    @Field(() => [TItemClass])
    data: TItem[];

    @Field(() => Pagination)
    pagination: Pagination;
  }
  return PaginatedResponseClass;
}
