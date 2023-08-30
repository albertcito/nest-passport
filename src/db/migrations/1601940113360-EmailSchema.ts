import { MigrationInterface, QueryRunner } from 'typeorm';

export default class EmailSchema1601940113360 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('CREATE SCHEMA IF NOT EXISTS email;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('DROP SCHEMA IF NOT EXISTS email;');
  }
}
