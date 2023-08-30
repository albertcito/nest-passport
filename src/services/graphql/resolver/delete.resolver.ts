import { Resolver, Args, Int, ArgsOptions, Mutation } from '@nestjs/graphql';
import BaseDataEntity from '@/services/model/BaseEntity';
import { getClassExtended } from './getClassExtended';
import { UseGuards } from '@nestjs/common';
import MessageField from '../messages/MessageField';
import SaveDBService from '@/services/db/save.db.service';

declare class BaseEntityImplementation extends BaseDataEntity {
  id: number | string;
}

interface DeleteResolverParams {
  name: string;
  guards?: Parameters<typeof UseGuards>;
  type?: ArgsOptions['type'];
}

const defaultType = () => Int;
const defaultGuards = [];

export function DeleteResolver(
  resolverType: typeof BaseEntityImplementation,
  params: DeleteResolverParams,
  resolverClass?: new (...args: any[]) => any,
) {
  const guards = params.guards ?? defaultGuards;
  const type = params.type ?? defaultType;
  @Resolver(() => resolverType)
  class DeleteResolverClass extends getClassExtended(
    resolverType,
    resolverClass,
  ) {
    constructor(public readonly db: SaveDBService) {
      super(db);
    }
    @UseGuards(...guards)
    @Mutation(() => MessageField, { name: `${params.name}Delete` })
    async delete(@Args({ name: 'id', type: type }) id: string | number) {
      return this.db.remove(id, resolverType);
    }
  }

  return DeleteResolverClass;
}
