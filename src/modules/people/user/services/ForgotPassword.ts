import SaveDBService from '@/services/db/save.db.service';
import { I18nService } from 'nestjs-i18n';
import UserTokenModel from '../user-token.model';
import User from '../user.model';
import UserToken from './UserToken';
import UserTokenEnum from './UserTokenEnum';

class ForgotPassword {
  constructor(
    private readonly db: SaveDBService,
    private readonly i18n: I18nService,
  ) {}

  async getToken(email: string): Promise<UserTokenModel> {
    const user = await this.db.findOne({ where: { email: email } }, User);
    const userToken = new UserToken(this.db, user.id);
    const token = await userToken.newToken(48, UserTokenEnum.RECOVERY_PASSWORD);
    return token;
  }

  async sendEmail(email: string) {
    const user = await this.db.findOne({ where: { email } }, User);
    const userToken = new UserToken(this.db, user.id);
    const link = await userToken.tokenLink(48, UserTokenEnum.RECOVERY_PASSWORD);
    const to = { name: user.fullName, address: email };
    /* await new Email(this.i18n, this.db, 'emails.recoveryPassword').send(
      { to, subject: 'Reset your password - Albertcito.com' },
      { name: user.fullName, link },
      user.id,
    ); */
  }
}

export default ForgotPassword;
