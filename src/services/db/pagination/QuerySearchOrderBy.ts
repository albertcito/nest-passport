import { OrderByCondition, SelectQueryBuilder } from 'typeorm';
import { QuerySearchInterface } from './QuerySearchInterface';

export default class QuerySearchOrderBy<Table>
  implements QuerySearchInterface<Table>
{
  public constructor(
    private readonly query: SelectQueryBuilder<Table>,
    private readonly table: string,
    private readonly orderBy: string,
    private readonly order: 'DESC' | 'ASC',
    private readonly getOrderBy?: (
      orderBy: string,
      order: 'DESC' | 'ASC',
    ) => OrderByCondition,
  ) {}

  public execute() {
    const orderParams = this.getOrderBy
      ? this.getOrderBy(this.orderBy, this.order)
      : this.getOrderByLocal(this.orderBy, this.order);
    this.query.orderBy(orderParams);
    return this.query;
  }

  private getOrderByLocal(
    orderBy: string,
    order: 'DESC' | 'ASC',
  ): OrderByCondition {
    switch (orderBy) {
      case 'text':
        return {
          [`"vtext"."${orderBy}"`]: order,
        };
      default:
        return {
          [`"${this.table}"."${orderBy}"`]: order,
        };
    }
  }
}
