import { CustomContext } from './custom-context';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Args, Context, Query } from '@nestjs/graphql';
import User from '../user/user.model';
import { AuthService } from './auth.service';
import LoginResponse from './dto/login-response';
import { GqlAuthGuard } from './gql.auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context,
  ): Promise<LoginResponse> {
    const response = await this.authService.login(context.user);
    return response;
  }

  @Mutation(() => Boolean)
  async logout() {
    return true;
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async loggedUserAuth(@Context() context: CustomContext): Promise<User> {
    const userID = context.req.user?.id;
    if (!userID) {
      throw new UnauthorizedException();
    }
    const user = this.authService.findOrNull({ id: userID });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async loggedUserNoAuth(@Context() context: CustomContext): Promise<User> {
    return this.loggedUserAuth(context);
  }
}
