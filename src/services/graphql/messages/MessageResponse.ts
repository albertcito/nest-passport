import { Type } from '@nestjs/common';
import { ObjectType, Field } from '@nestjs/graphql';
import MessageField from './MessageField';

export default function MessageResponse<TItem>(TItemClass: Type<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => TItemClass)
    data: TItem;

    @Field(() => MessageField)
    message: MessageField;
  }
  return PaginatedResponseClass;
}
