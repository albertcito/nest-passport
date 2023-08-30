import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import User from '@/modules/people/user/user.model';
import BaseDataEntity from '@/services/model/BaseEntity';
import { getClassExtended } from './getClassExtended';
import SaveDBService from '@/services/db/save.db.service';

export function BaseEntityResolver(
  resolverType: typeof BaseDataEntity,
  resolverClass?: new (...args: any[]) => any,
) {
  @Resolver(() => resolverType)
  class BaseEntityResolverClass extends getClassExtended(
    resolverType,
    resolverClass,
  ) {
    constructor(public readonly db: SaveDBService) {
      super(db);
    }
    @ResolveField(() => User, { nullable: true })
    async createdByUser(@Parent() entity: BaseDataEntity) {
      return entity.createdBy
        ? this.db.findOne({ where: { id: entity.createdBy } }, User)
        : undefined;
    }
    @ResolveField(() => User, { nullable: true })
    async updatedByUser(@Parent() entity: BaseDataEntity) {
      return entity.updatedBy
        ? this.db.findOne({ where: { id: entity.updatedBy } }, User)
        : undefined;
    }
  }

  return BaseEntityResolverClass;
}
