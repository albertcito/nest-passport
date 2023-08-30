import { MigrationInterface, QueryRunner } from 'typeorm';

export default class Uuid1601324673000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
    );
  }

  public async down(): Promise<void> {
    //
  }
}
