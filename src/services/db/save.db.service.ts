import { CustomContext } from '@/modules/people/auth/custom-context';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  DataSource,
  DeepPartial,
  DeleteResult,
  EntityTarget,
  FindOneOptions,
  InsertResult,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import BaseDataEntity from '../model/BaseEntity';

import IpAddress from './IpAddress';
import MessageField from '../graphql/messages/MessageField';
import MessageType from '../graphql/messages/MessageType.enum';

type UpdateCriteriaType = Parameters<typeof Repository.prototype.update>[0];
type BaseEntityID = ObjectLiteral & { id: number | string };

@Injectable()
export default class SaveDBService {
  constructor(
    public readonly dataSource: DataSource,
    @Inject(REQUEST) private readonly context?: CustomContext,
  ) {}

  async findOne<T extends ObjectLiteral>(
    where: FindOneOptions<T>,
    repository: EntityTarget<T>,
  ): Promise<T> {
    const data = await this.dataSource.getRepository(repository).findOne(where);
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  async find<Entity extends ObjectLiteral>(
    where: FindOneOptions<Entity>,
    repository: EntityTarget<Entity>,
  ): Promise<Entity[]> {
    const data = await this.dataSource.getRepository(repository).find(where);
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  async remove(
    id: number | string,
    repository: EntityTarget<BaseEntityID>,
  ): Promise<MessageField> {
    await this.findOne({ where: { id } }, repository);
    await this.dataSource
      .getRepository(repository)
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
    return {
      message: 'Item deleted',
      type: MessageType.success,
    };
  }

  async update<T>(
    criteria: UpdateCriteriaType,
    type: EntityTarget<T>,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return this.dataSource.getRepository(type).update(criteria, {
      ...data,
      ...this.auditUpdateData(),
    });
  }

  async create<T>(
    type: EntityTarget<T>,
    values: DeepPartial<T> & { id?: number | string },
  ): Promise<T> {
    return await this.dataSource.getRepository(type).save(
      {
        ...values,
        ...this.auditCreateData(),
      },
      { reload: true },
    );
  }

  async createBulk<T extends BaseDataEntity>(
    type: EntityTarget<T>,
    rows: DeepPartial<T>[],
    values?: Partial<Record<keyof T, string | number>>,
  ): Promise<InsertResult> {
    const data = rows.map((row) => ({
      ...row,
      ...values,
      ...this.auditCreateData(),
    })) as QueryDeepPartialEntity<T>[];
    return this.dataSource.transaction(() => {
      return this.dataSource
        .createQueryBuilder()
        .insert()
        .into(type)
        .values(data)
        .execute();
    });
  }

  /**
   *
   * INSERT INTO color_tag
   *  (columnName, values.key)
   * VALUES
   *  (columnValues[0], values.value)
   *  (columnValues[1], values.value)
   *  (columnValues[2], values.value)
   */
  async createBulkByID<Model>(
    type: EntityTarget<Model>,
    values: Partial<Model>,
    columnName: string,
    columnValues: (string | number)[],
  ): Promise<InsertResult> {
    const data = columnValues.map((columnValue) => ({
      [columnName]: columnValue,
      ...values,
      ...this.auditCreateData(),
    })) as QueryDeepPartialEntity<Model>;
    return this.dataSource.transaction(() => {
      return this.dataSource
        .createQueryBuilder()
        .insert()
        .into(type)
        .values(data)
        .execute();
    });
  }

  async deleteBulk<T extends ObjectLiteral>(
    type: EntityTarget<T>,
    foreignKeyName: string,
    ids: number[],
  ): Promise<DeleteResult> {
    return this.dataSource.transaction(() => {
      const query = this.dataSource
        .createQueryBuilder()
        .delete()
        .from(type)
        .where(`${foreignKeyName} IN(:...ids)`, { ids });
      return query.execute();
    });
  }

  private auditUpdateData() {
    const now = new Date();
    const updatedBy = this.context?.req.user?.id;
    return {
      updatedAt: now,
      updatedBy,
      ipAddress: IpAddress.getIpAddress(this.context?.req),
    };
  }

  private auditCreateData() {
    const now = new Date();
    const createdBy = this.context?.req.user?.id;
    return {
      createdAt: now,
      createdBy,
      ipAddress: IpAddress.getIpAddress(this.context?.req),
    };
  }
}
