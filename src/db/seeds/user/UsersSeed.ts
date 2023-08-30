import User from '@/modules/people/user/user.model';
import SaveDBService from '@/services/db/save.db.service';
import dbUsers from './dbUser';
import * as argon2 from 'argon2';

export default class UsersSeed {
  public constructor(private readonly db: SaveDBService) {}

  public async run() {
    const { superAdmin, admin } = dbUsers();

    const bio =
      'Eos doloremque dolor ratione architecto maiores maxime' +
      'aut consequatur. Mollitia eligendi nobis nostrum aut. Quo quia aut' +
      'quia facere dolor ab necessitatibus quidem.';

    const password = await argon2.hash(superAdmin.password);

    const a = await this.db.create(User, {
      username: superAdmin.username,
      firstName: superAdmin.firstName,
      lastName: superAdmin.lastName,
      email: superAdmin.email,
      langID: 'ES',
      password,
    });
    const sa = await this.db.create(User, {
      username: admin.username,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      langID: 'ES',
      password,
      emailVerified: new Date(),
      bio: bio,
    });

    return {
      admin: a,
      superAdmin: sa,
    };
  }
}
