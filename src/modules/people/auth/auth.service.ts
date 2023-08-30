import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import User from '../user/user.model';
import SaveDBService from '@/services/db/save.db.service';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    public readonly db: SaveDBService,
  ) {
    console.log('AuthService running...');
  }

  async findOrNull(input: FindOptionsWhere<User>) {
    return await this.db.dataSource
      .getRepository(User)
      .findOne({ where: input });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findOrNull({ email });

    if (!user) {
      throw new UnauthorizedException('Email or password wrong');
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      throw new UnauthorizedException('Email or password wrong');
    }
    return user;
  }

  async login(user: User) {
    return {
      token: this.jwtService.sign({
        email: user.email,
        id: user.id,
        lang: user.langID,
      }),
      user: user,
    };
  }
}
