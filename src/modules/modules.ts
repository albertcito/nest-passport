import { DynamicModule, Type, ForwardReference } from '@nestjs/common';
import langModules from './lang/lang.module';
import { UserModule } from './people/user/user.module';

const modules: (
  | DynamicModule
  | Type<any>
  | Promise<DynamicModule>
  | ForwardReference<any>
)[] = [UserModule, ...langModules];

export default modules;
