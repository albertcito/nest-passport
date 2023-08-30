import Paginate from '@/services/db/paginate';
import { Injectable } from '@nestjs/common';
import LangPaginationResponse from './dto/LangPaginationResponse';
import Lang from './lang.model';
import SaveDBService from '@/services/db/save.db.service';

@Injectable()
export class LangsService {
  public constructor(public readonly db: SaveDBService) {}

  async findAll(active?: boolean): Promise<LangPaginationResponse> {
    const query = this.db.dataSource
      .getRepository(Lang)
      .createQueryBuilder('lang');
    if (active !== undefined) {
      query.where({ active });
    }
    return new Paginate(query).get(1, 20);
  }
}
