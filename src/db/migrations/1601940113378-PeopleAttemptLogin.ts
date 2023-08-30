import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { auditColumns, getAuditColumnsFKs } from '../util/auditColumns';

export default class PeopleAttemptLogin1601940113378
  implements MigrationInterface
{
  private readonly tableName = 'people.attempt_login';

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
            name: 'result',
            type: 'boolean',
            comment: 'true: success login',
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
        name: 'password_update_user_id',
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
