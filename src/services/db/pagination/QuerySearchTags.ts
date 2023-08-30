import { SelectQueryBuilder } from 'typeorm';
import { QuerySearchInterface } from './QuerySearchInterface';

export default class QuerySearchTags<Table>
  implements QuerySearchInterface<Table>
{
  public constructor(
    private readonly query: SelectQueryBuilder<Table>,
    private readonly table: string,
    private readonly tableTag: string,
    private readonly tags: number[],
  ) {}

  public execute() {
    return this.query.innerJoin(
      this.tableTag,
      this.tableTag,
      `${this.tableTag}.${this.table}_id = ${this.table}.id
        AND ${this.tableTag}.tag_id IN (:...tags)`,
      { tags: this.tags },
    );
  }
}
