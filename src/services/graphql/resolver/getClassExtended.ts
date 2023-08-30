import SaveDBService from '@/services/db/save.db.service';
import { Resolver } from '@nestjs/graphql';

export type Constructor<I = any> = new (db: SaveDBService) => I;
export const getClassExtended = (
  entityType: Constructor,
  resolverClass?: new (db: SaveDBService) => any,
) => {
  if (!resolverClass) {
    return class ClassResolver {};
  }
  @Resolver(() => entityType)
  class ClassResolver extends resolverClass {}

  return ClassResolver;
};
