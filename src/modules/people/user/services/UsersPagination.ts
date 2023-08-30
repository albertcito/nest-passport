import Paginate from '@/services/db/paginate';
import { isNumber } from 'class-validator';
import { SelectQueryBuilder } from 'typeorm';
import PaginationUserInput from '../dto/PaginationUserInput';
import User from '../user.model';

export default class UsersPagination {
  public constructor(private readonly query: SelectQueryBuilder<User>) {}

  public getAll(parameters: PaginationUserInput) {
    const { page, limit, orderBy, order, search } = parameters;

    if (search && isNumber(search)) {
      this.findByID(Number.parseInt(search, 10));
    } else if (search) {
      this.findByString(search);
    }

    if (orderBy && order) {
      this.query.orderBy(orderBy, order);
    }
    return new Paginate(this.query).get(page, limit);
  }

  private findByID(id: number) {
    this.query.where('id = :id', { id });
  }

  private findByString(search: string) {
    this.query.where(
      `unaccent(first_name) ilike unaccent(:search)
      OR unaccent(last_name) ilike unaccent(:search)
      OR unaccent(email) ilike unaccent(:search)`,
      { search: `%${search}%` },
    );
  }
}
