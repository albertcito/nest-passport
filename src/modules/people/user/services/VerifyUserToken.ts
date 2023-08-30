import MessageError from '@/services/exceptions/MessageError';
import UserToken from '../user-token.model';
import UserTokenEnum from './UserTokenEnum';
import SaveDBService from '@/services/db/save.db.service';

class VerifyUserToken {
  constructor(private readonly db: SaveDBService) {}

  async getToken(token: string, type: UserTokenEnum) {
    const userToken = await this.db.findOne(
      {
        where: {
          token,
          type,
        },
      },
      UserToken,
    );
    if (!userToken) {
      throw new MessageError('The token does not exist');
    }

    if (userToken.usedAt) {
      throw new MessageError('The token already was used');
    }

    const expiredAt = new Date(userToken.expiredAt);
    const now = new Date();
    if (expiredAt.getTime() < now.getTime()) {
      throw new MessageError('The token was expired');
    }

    return userToken;
  }
}

export default VerifyUserToken;
