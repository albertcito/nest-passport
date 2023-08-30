import { SelectQueryBuilder } from 'typeorm';

interface FetchMoreFormat {
  total: number;
  hasMore: boolean;
}

export default class FetchMore<T> {
  private readonly query: SelectQueryBuilder<T>;

  constructor(query: SelectQueryBuilder<T>) {
    this.query = query;
  }

  async get(skip = 0, limit = 10) {
    const total = await this.query.getCount();
    const resultPagination = this.query.offset(skip).limit(limit);
    const data = await resultPagination.getMany();
    const fetchMore: FetchMoreFormat = {
      total,
      hasMore: !!(total - data.length),
    };
    return {
      fetchMore,
      data,
    };
  }
}
