import { MigrationInterface, QueryRunner } from 'typeorm';

export default class PeopleSchema1501324674380 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('CREATE SCHEMA IF NOT EXISTS people;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('DROP SCHEMA IF NOT EXISTS people;');
  }
}
