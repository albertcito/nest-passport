import SaveDBService from '@/services/db/save.db.service';
import argon2 from 'argon2';
import UserToken from '../user-token.model';
import User from '../user.model';

import UserTokenEnum from './UserTokenEnum';
import VerifyUserToken from './VerifyUserToken';

class ResetPassword {
  constructor(
    private readonly db: SaveDBService,
    private readonly verifyUserToken: VerifyUserToken,
  ) {}

  async save(token: string, password: string) {
    const userToken = await this.verifyUserToken.getToken(
      token,
      UserTokenEnum.RECOVERY_PASSWORD,
    );
    const user = await this.db.findOne(
      { where: { id: userToken.userID } },
      User,
    );
    if (!user) {
      throw new Error(
        'The user does not exist. It never should happens - fake token.',
      );
    }

    await this.db.update({ id: userToken.userID }, User, {
      password: await argon2.hash(password),
    });

    await this.db.update({ id: userToken.id }, UserToken, {
      usedAt: new Date(),
    });
  }
}

export default ResetPassword;
