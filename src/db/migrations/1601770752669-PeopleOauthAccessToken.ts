import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { auditColumns, getAuditColumnsFKs } from '../util/auditColumns';

export default class PeopleOauthAccessToken1601770752669
  implements MigrationInterface
{
  private readonly tableName = 'people.oauth_access_tokens';

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
            name: 'signature',
            type: 'varchar',
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'revoked',
            type: 'boolean',
            default: false,
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
        name: 'oauth_access_tokens_user_id',
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
