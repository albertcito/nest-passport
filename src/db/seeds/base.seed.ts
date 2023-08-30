import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import SaveDBService from '@/services/db/save.db.service';
import LangSeed from './lang/LangSeed';

export default class CreateUsersSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: SeederFactoryManager,
  ): Promise<void> {
    const db = new SaveDBService(dataSource);
    console.log('Saving LangSeed...');
    await new LangSeed(db).run();
  }
}
