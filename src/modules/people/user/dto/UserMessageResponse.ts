import MessageResponse from '@/services/graphql/messages/MessageResponse';

import { ObjectType } from '@nestjs/graphql';
import User from '../user.model';

@ObjectType()
export default class UserMessageResponse extends MessageResponse(User) {}
