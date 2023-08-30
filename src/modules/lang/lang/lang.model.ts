import BaseDataEntity from '@/services/model/BaseEntity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'lang', schema: 'lang' })
export default class Lang extends BaseDataEntity {
  @Field(() => String)
  @PrimaryColumn()
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  localname: string;

  @Field(() => Boolean)
  @Column()
  active: boolean;

  @Field(() => Boolean)
  @Column({ name: 'is_blocked' })
  isBlocked: boolean;
}
