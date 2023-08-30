import { MigrationInterface, QueryRunner } from 'typeorm';

export default class LangSchema1601324673080 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('CREATE SCHEMA IF NOT EXISTS lang;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('DROP SCHEMA IF NOT EXISTS lang;');
  }
}
