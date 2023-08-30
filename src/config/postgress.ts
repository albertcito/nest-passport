import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import getConnectionOptions from './postgressParams';

config();

new ConfigService();
const dataSource = new DataSource(getConnectionOptions);

export default dataSource;
