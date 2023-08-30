import SaveDBService from '@/services/db/save.db.service';
import Lang from '@/modules/lang/lang/lang.model';

export default class LangSeed {
  public constructor(private readonly db: SaveDBService) {}

  public async run() {
    await this.db.create(Lang, {
      id: 'EN',
      localname: 'English',
      name: 'English',
      active: true,
      isBlocked: true,
    });

    await this.db.create(Lang, {
      id: 'ES',
      localname: 'Español',
      name: 'Spanish',
      active: true,
      isBlocked: true,
    });
  }
}
