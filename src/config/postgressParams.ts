import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { db } from '../config';

const getConnectionOptions = (): PostgresConnectionOptions => ({
  type: 'postgres',
  // logging: true,
  entities: [join(__dirname, '../modules/**/*.model{.ts,.js}')],
  migrations: [join(__dirname, '../db/migrations/**/*{.ts,.js}')],
  subscribers: [join(__dirname, '../db/subscribers/**/*{.ts,.js}')],
  host: db.host,
  port: db.port,
  username: db.user,
  password: db.password,
  database: db.name,
});

export default getConnectionOptions();
