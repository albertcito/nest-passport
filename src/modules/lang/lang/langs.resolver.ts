import { DeleteResolver } from '@/services/graphql/resolver/delete.resolver';
import { FindOneResolver } from '@/services/graphql/resolver/find-one.resolver';
import { Args, Query, Resolver } from '@nestjs/graphql';
import LangPaginationResponse from './dto/LangPaginationResponse';
import Lang from './lang.model';
import { LangsService } from './langs.service';

@Resolver(() => Lang)
export class LangsResolver extends DeleteResolver(
  Lang,
  { name: 'lang', type: () => String },
  FindOneResolver(Lang, { name: 'lang', type: () => String }),
) {
  constructor(service: LangsService) {
    super(service.db);
  }

  @Query(() => LangPaginationResponse)
  async langs(
    @Args({ name: 'active', type: () => Boolean, nullable: true })
    active?: boolean,
  ): Promise<LangPaginationResponse> {
    return this.service.findAll(active);
  }
}
