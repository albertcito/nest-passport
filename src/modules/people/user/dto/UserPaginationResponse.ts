import PaginationResponse from '@/services/graphql/pagination/PaginationResponse';

import { ObjectType } from '@nestjs/graphql';
import User from '../user.model';

@ObjectType()
export default class UserPaginationResponse extends PaginationResponse(User) {}
