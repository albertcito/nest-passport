import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { auditColumns, getAuditColumnsFKs } from '../util/auditColumns';

export default class PeopleUserToken1601940113364
  implements MigrationInterface
{
  private readonly tableName = 'people.user_token';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'integer',
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'used_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'expired_at',
            type: 'timestamp',
          },
          ...auditColumns,
        ],
      }),
      true,
    );

    await getAuditColumnsFKs(queryRunner, this.tableName);

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: 'user_token_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'people.user',
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
