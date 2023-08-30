import { SelectQueryBuilder } from 'typeorm';
import { QuerySearchInterface } from './QuerySearchInterface';

export default class QuerySearchText<Table>
  implements QuerySearchInterface<Table>
{
  public constructor(
    private readonly query: SelectQueryBuilder<Table>,
    private readonly table: string,
    private readonly langID: string,
    private readonly search?: string,
  ) {}

  public execute() {
    const condition = `${this.table}.title_id = vtext.translation_id AND vtext.lang_id = :langID`;
    this.query.leftJoin('vtext', 'vtext', condition, { langID: this.langID });
    if (this.search) {
      this.query.andWhere('unaccent(vtext.text) ilike unaccent(:search)', {
        search: `%${this.search}%`,
      });
    }
    return this.query;
  }
}
