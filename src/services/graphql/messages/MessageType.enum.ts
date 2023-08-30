import { registerEnumType } from '@nestjs/graphql';

enum MessageType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

registerEnumType(MessageType, {
  name: 'MessageType',
  description: 'All possible message types',
});

export default MessageType;
