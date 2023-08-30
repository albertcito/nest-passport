import Pagination from '@/services/graphql/pagination/Pagination';
import { PaginatedResponse } from '@/services/graphql/pagination/PaginationResponse';
import { SelectQueryBuilder } from 'typeorm';

export default class Paginate<T> {
  private readonly query: SelectQueryBuilder<T>;

  constructor(query: SelectQueryBuilder<T>) {
    this.query = query;
  }

  async get(page = 1, limit = 10): Promise<PaginatedResponse<T>> {
    const total = await this.query.getCount();

    const skippedItems = (page - 1) * limit;

    const resultPagination = this.query.offset(skippedItems).limit(limit);

    const data = await resultPagination.getMany();
    const to = page * limit;
    const from = (page - 1) * limit;

    const pagination: Pagination = {
      length: data.length,
      total,
      page,
      limit,
      from: from < total ? from : total,
      to: to < total ? to : total,
    };

    return {
      pagination,
      data,
    };
  }
}
