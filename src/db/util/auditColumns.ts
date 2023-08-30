import { QueryRunner, TableForeignKey } from 'typeorm';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export const auditColumns: TableColumnOptions[] = [
  {
    name: 'created_by',
    type: 'integer',
    isNullable: true,
  },
  {
    name: 'updated_by',
    type: 'integer',
    isNullable: true,
  },
  {
    name: 'created_at',
    type: 'timestamp',
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    isNullable: true,
  },
  {
    name: 'delete_at',
    type: 'timestamp',
    isNullable: true,
  },
  {
    name: 'ip_address',
    type: 'varchar',
    isNullable: true,
  },
];

export const getConstraintName = (
  columns: string[],
  tableName: string,
  type: 'u' | 'fk' = 'fk',
) => {
  const newTableName = tableName.replace('.', '_');
  return `${type}_${columns.join('_')}_${newTableName}`;
};

export async function getAuditColumnsFKs(
  queryRunner: QueryRunner,
  tableName: string,
) {
  await queryRunner.createForeignKey(
    tableName,
    new TableForeignKey({
      name: `fk_updated_by_${tableName}`,
      columnNames: ['updated_by'],
      referencedColumnNames: ['id'],
      referencedTableName: 'people.user',
      onDelete: 'RESTRICT',
    }),
  );
  await queryRunner.createForeignKey(
    tableName,
    new TableForeignKey({
      name: `fk_created_by_${tableName}`,
      columnNames: ['created_by'],
      referencedColumnNames: ['id'],
      referencedTableName: 'people.user',
      onDelete: 'RESTRICT',
    }),
  );
}
