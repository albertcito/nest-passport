import { IsIn } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import PaginationTagsInput from '@/services/graphql/pagination/PaginationTagsInput';

const columns = ['id', 'email', 'first_name', 'last_name', 'user_status_id'];

@InputType('PaginationUserInput')
export default class PaginationUserInput extends PaginationTagsInput {
  @IsIn(columns)
  @Field(() => String, {
    nullable: true,
    defaultValue: 'id',
    description: `Columns allowed: ${columns.join(', ')}`,
  })
  orderBy = 'id';
}
