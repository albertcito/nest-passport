import * as argon2 from 'argon2';
import SaveDBService from '@/services/db/save.db.service';
import MessageError from '@/services/exceptions/MessageError';
import User from '../user.model';

export default class UserUpdateEmail {
  constructor(
    private readonly user: User,
    private readonly db: SaveDBService,
  ) {}

  async update(email: string, password?: string) {
    if (password) {
      const valid = await argon2.verify(this.user.password, password);
      if (!valid) {
        throw new MessageError('passwordNotRight');
      }
    }

    await this.db.update(this.user.id, User, { email });
  }
}
