import { Type } from '@nestjs/common';
import { ObjectType, Field } from '@nestjs/graphql';
import MessageField from './MessageField';

export default function MessageResponseArray<TItem>(TItemClass: Type<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseArrayClass {
    @Field(() => [TItemClass])
    data: TItem[];

    @Field(() => MessageField)
    message: MessageField;
  }
  return PaginatedResponseArrayClass;
}
