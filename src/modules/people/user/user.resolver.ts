import { FindOneResolver } from '@/services/graphql/resolver/find-one.resolver';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomContext } from '../auth/custom-context';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import PaginationUserInput from './dto/PaginationUserInput';
import UserMessageResponse from './dto/UserMessageResponse';
import UserPaginationResponse from './dto/UserPaginationResponse';
import User from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver extends FindOneResolver(User, {
  name: 'user',
  guards: [JwtAuthGuard],
}) {
  constructor(private readonly service: UserService) {
    super(service.db);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserPaginationResponse)
  async users(
    @Args({
      name: 'pagination',
      type: () => PaginationUserInput,
      nullable: true,
      defaultValue: new PaginationUserInput(),
    })
    pagination: PaginationUserInput,
  ): Promise<UserPaginationResponse> {
    return this.service.findAll(pagination);
  }

  @Mutation(() => UserMessageResponse)
  @UseGuards(JwtAuthGuard)
  async profileBasicUpdate(
    @Context() context: CustomContext,
    @Args({ name: 'firstName', type: () => String }) firstName: string,
    @Args({ name: 'lastName', type: () => String }) lastName: string,
    @Args({ name: 'langID', type: () => String }) langID: string,
  ): Promise<UserMessageResponse> {
    const user = await this.service.db.findOne(
      { where: { id: context.req.user.id } },
      User,
    );
    return this.service.update(user, firstName, lastName, langID);
  }

  @Mutation(() => UserMessageResponse)
  @UseGuards(JwtAuthGuard)
  async userBasicUpdate(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args({ name: 'firstName', type: () => String }) firstName: string,
    @Args({ name: 'lastName', type: () => String }) lastName: string,
    @Args({ name: 'langID', type: () => String }) langID: string,
  ): Promise<UserMessageResponse> {
    const user = await this.service.db.findOne<User>({ where: { id } }, User);
    return this.service.update(user, firstName, lastName, langID);
  }

  @Mutation(() => UserMessageResponse)
  @UseGuards(JwtAuthGuard)
  async profileUpdatePassword(
    @Context() context: CustomContext,
    @Args({ name: 'password', type: () => String }) password: string,
    @Args({ name: 'newPassword', type: () => String }) newPassword: string,
  ): Promise<UserMessageResponse> {
    const user = await this.service.db.findOne<User>(
      { where: { id: context.req.user.id } },
      User,
    );
    return this.service.updatePasseword(user, newPassword, password);
  }

  @Mutation(() => UserMessageResponse)
  async userUpdatePassword(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args({ name: 'password', type: () => String }) password: string,
  ): Promise<UserMessageResponse> {
    const user = await this.service.db.findOne<User>({ where: { id } }, User);
    return this.service.updatePasseword(user, password);
  }

  @Mutation(() => UserMessageResponse)
  async profileUpdateEmail(
    @Context() context: CustomContext,
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
  ): Promise<UserMessageResponse> {
    const user = await this.service.db.findOne<User>(
      { where: { id: context.req.user.id } },
      User,
    );
    return this.service.updateEmail(user, email, password);
  }

  @Mutation(() => UserMessageResponse)
  async userUpdateEmail(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args({ name: 'email', type: () => String }) email: string,
  ): Promise<UserMessageResponse> {
    const user = await this.service.db.findOne<User>({ where: { id } }, User);
    return this.service.updateEmail(user, email);
  }

  @Mutation(() => String)
  async resetPassword(
    @Args('token') token: string,
    @Args('password') password: string,
    @Args('passwordConfirmation') passwordConfirmation: string,
  ): Promise<string> {
    return this.service.resetPassword(token, password, passwordConfirmation);
  }

  @Mutation(() => String)
  async forgotPassword(@Args('email') email: string): Promise<string> {
    return this.service.forgotPassword(email);
  }
}
