import UserTokenEnum from './UserTokenEnum';
import UserTokenModel from '@/modules/people/user/user-token.model';
import { frontend } from '@/config';
import SaveDBService from '@/services/db/save.db.service';

class UserToken {
  constructor(
    private readonly db: SaveDBService,
    private readonly userID: number,
  ) {}

  /**
   *
   * @param expired in hours
   * @param type token
   */
  async newToken(
    expired: number,
    type: UserTokenEnum,
  ): Promise<UserTokenModel> {
    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + expired);
    return this.db.create(UserTokenModel, {
      userID: this.userID,
      type: type,
      expiredAt: expiredAt,
    });
  }

  async tokenLink(expired: number, type: UserTokenEnum): Promise<string> {
    const token = await this.newToken(expired, type);
    return frontend.URL.resetPass.replace('%s', token.token);
  }
}

export default UserToken;
