import { SelectQueryBuilder } from 'typeorm';

export interface QuerySearchInterface<Table> {
  execute: (args) => SelectQueryBuilder<Table>;
}
