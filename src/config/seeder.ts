import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import dbConnection from './postgressParams';

const options: DataSourceOptions & SeederOptions = {
  ...dbConnection,
  seeds: [join(__dirname, '../db/seeds/**/*.seed{.ts,.js}')],
};

console.log(options);

export const dataSource = new DataSource(options);

export default options;
