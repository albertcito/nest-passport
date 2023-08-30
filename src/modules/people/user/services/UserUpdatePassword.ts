import SaveDBService from '@/services/db/save.db.service';
import MessageError from '@/services/exceptions/MessageError';
import * as argon2 from 'argon2';
import User from '../user.model';

export default class UserUpdatePassword {
  constructor(
    private readonly user: User,
    private readonly db: SaveDBService,
  ) {}

  async update(newPassword: string, password?: string) {
    if (password) {
      const valid = await argon2.verify(this.user.password, password);
      if (!valid) {
        throw new MessageError('passwordNotRight');
      }
    }

    const newPasswordHash = await argon2.hash(newPassword);

    await this.db.update(this.user.id, User, {
      password: newPasswordHash,
    });
  }
}
