import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { tokens } from '../../../config';
import { UserSession } from './custom-context';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: tokens.jwt,
      logging: true,
    });
  }

  /**
   *
   * @param payload decoded JWT
   * @returns
   */
  async validate(payload: UserSession) {
    return {
      email: payload.email,
      id: payload.id,
      lang: payload.lang,
    };
  }
}
