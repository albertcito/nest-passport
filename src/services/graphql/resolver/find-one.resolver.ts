import { Resolver, Args, Int, Query, ArgsOptions } from '@nestjs/graphql';
import BaseDataEntity from '@/services/model/BaseEntity';
import { getClassExtended } from './getClassExtended';
import { UseGuards } from '@nestjs/common';
import SaveDBService from '@/services/db/save.db.service';

declare class BaseEntityImplementation extends BaseDataEntity {
  id: number | string;
}

interface FindOneResolverParams {
  name: string;
  guards?: Parameters<typeof UseGuards>;
  type?: ArgsOptions['type'];
}

const defaultType = () => Int;
const defaultGuards = [];

export function FindOneResolver(
  resolverType: typeof BaseEntityImplementation,
  params: FindOneResolverParams,
  resolverClass?: new (...args: any[]) => any,
) {
  const guards = params.guards ?? defaultGuards;
  const type = params.type ?? defaultType;
  @Resolver(() => resolverType)
  class BaseQueriesResolverClass extends getClassExtended(
    resolverType,
    resolverClass,
  ) {
    constructor(public readonly db: SaveDBService) {
      super(db);
    }

    @UseGuards(...guards)
    @Query(() => resolverType, { name: params.name })
    async findOne(
      @Args({ name: 'id', type: type }) id: BaseEntityImplementation['id'],
    ) {
      return this.db.findOne({ where: { id } }, resolverType);
    }
  }

  return BaseQueriesResolverClass;
}
