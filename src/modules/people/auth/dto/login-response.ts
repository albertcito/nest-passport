import { Field, ObjectType } from '@nestjs/graphql';
import User from '../../user/user.model';

@ObjectType()
export default class LoginResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
