import SaveDBService from '@/services/db/save.db.service';
import MessageType from '@/services/graphql/messages/MessageType.enum';
import { Injectable } from '@nestjs/common';
import PaginationUserInput from './dto/PaginationUserInput';
import UserPaginationResponse from './dto/UserPaginationResponse';
import UsersPagination from './services/UsersPagination';
import { I18nService } from 'nestjs-i18n';
import User from './user.model';
import UserMessageResponse from './dto/UserMessageResponse';
import UserUpdatePassword from './services/UserUpdatePassword';
import UserUpdateEmail from './services/UserUpdateEmail';
import ResetPassword from './services/ResetPassword';
import ForgotPassword from './services/ForgotPassword';
import VerifyUserToken from './services/VerifyUserToken';

@Injectable()
export class UserService {
  public constructor(
    public readonly db: SaveDBService,
    public readonly i18n: I18nService,
  ) {}

  async findAll(inputs: PaginationUserInput): Promise<UserPaginationResponse> {
    return new UsersPagination(
      this.db.dataSource.getRepository(User).createQueryBuilder(),
    ).getAll(inputs);
  }

  async findByEmail(email: string): Promise<User> {
    return this.db.findOne({ where: { email } }, User);
  }

  async update(
    user: User,
    firstName: string,
    lastName: string,
    langID: string,
  ): Promise<UserMessageResponse> {
    this.db.update({ id: user.id }, User, {
      firstName,
      lastName,
      langID,
    });

    return {
      data: user,
      message: {
        type: MessageType.success,
        message: this.i18n.t('generic.item_updated'),
      },
    };
  }

  async updatePasseword(
    user: User,
    newPassword: string,
    password?: string,
  ): Promise<UserMessageResponse> {
    await this.db.dataSource.transaction(
      async () =>
        await new UserUpdatePassword(user, this.db).update(
          newPassword,
          password,
        ),
    );
    return {
      data: user,
      message: {
        type: MessageType.success,
        message: this.i18n.t('generic.item_updated'),
      },
    };
  }

  async updateEmail(
    user: User,
    email: string,
    password?: string,
  ): Promise<UserMessageResponse> {
    await this.db.dataSource.transaction(
      async () =>
        await new UserUpdateEmail(user, this.db).update(email, password),
    );
    return {
      data: user,
      message: {
        type: MessageType.success,
        message: this.i18n.t('generic.item_updated'),
      },
    };
  }
  async resetPassword(
    token: string,
    password: string,
    passwordConfirmation: string,
  ) {
    const verifyUserToken = new VerifyUserToken(this.db);
    await this.db.dataSource.transaction(() =>
      new ResetPassword(this.db, verifyUserToken).save(token, password),
    );
    return 'Your password was suscefully updated';
  }

  async forgotPassword(email: string) {
    const forgotPassword = new ForgotPassword(this.db, this.i18n);
    await forgotPassword.sendEmail(email);
    return 'recoveryPasswordMessage';
  }
}
