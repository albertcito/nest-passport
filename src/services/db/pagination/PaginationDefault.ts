import { OrderByCondition, SelectQueryBuilder } from 'typeorm';
import PaginationTagsInput from '../../graphql/pagination/PaginationTagsInput';
import QuerySearchOrderBy from './QuerySearchOrderBy';
import PaginationTag from './QuerySearchTags';
import QuerySearchText from './QuerySearchText';

interface PaginationProps extends Omit<PaginationTagsInput, 'page' | 'limit'> {
  langID?: string;
  orderBy?: string;
}

export default class PaginationDefault<Table> {
  public constructor(private readonly query: SelectQueryBuilder<Table>) {}

  public getAll(
    parameters: PaginationProps,
    getOrderBy?: (orderBy: string, order: 'DESC' | 'ASC') => OrderByCondition,
  ) {
    const { orderBy, order, tags, search, langID } = parameters;

    // if (langID) {
    new QuerySearchText<Table>(
      this.query,
      this.query.alias,
      langID,
      search,
    ).execute();
    // }

    if (tags && tags.length > 0) {
      new PaginationTag<Table>(
        this.query,
        this.query.alias,
        `${this.query.alias}_tag`,
        tags,
      ).execute();
    }

    if (orderBy && order) {
      new QuerySearchOrderBy(
        this.query,
        this.query.alias,
        orderBy,
        order,
        getOrderBy,
      ).execute();
    }

    return this.query;
  }
}
