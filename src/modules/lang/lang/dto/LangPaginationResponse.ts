import PaginationResponse from '@/services/graphql/pagination/PaginationResponse';
import { ObjectType } from '@nestjs/graphql';
import Lang from '../lang.model';

@ObjectType()
export default class LangPaginationResponse extends PaginationResponse(Lang) {}
