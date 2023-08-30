import { QueryRunner } from 'typeorm';

export default class EnumDB {
  public constructor(
    private readonly name: string,
    private readonly enums: string[],
  ) {}

  up(queryRunner: QueryRunner) {
    const enums = this.enums.map((d) => `'${d}'`).join();
    return queryRunner.query(`CREATE TYPE ${this.name}
    AS ENUM(${enums});`);
  }

  down(queryRunner: QueryRunner) {
    return queryRunner.query(`DROP TYPE ${this.name}`);
  }
}
