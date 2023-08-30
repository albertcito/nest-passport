import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { auditColumns, getAuditColumnsFKs } from '../util/auditColumns';

export default class Lang1601324673082 implements MigrationInterface {
  private readonly tableName = 'lang.lang';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'localname',
            type: 'varchar',
          },
          {
            name: 'active',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_blocked',
            type: 'boolean',
            default: false,
          },
          ...auditColumns,
        ],
      }),
      true,
    );

    await queryRunner.manager.query(
      'CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;',
    );

    await getAuditColumnsFKs(queryRunner, this.tableName);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.query('DROP EXTENSION IF EXISTS unaccent;');
    queryRunner.manager.query('DROP SCHEMA IF EXISTS lang;');
    await queryRunner.dropTable(this.tableName);
  }
}
