import BaseDataEntity from '@/services/model/BaseEntity';
import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'user_token', schema: 'people' })
class UserToken extends BaseDataEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ name: 'user_id' })
  userID: number;

  @Field(() => String)
  @Column()
  token: string;

  @Field(() => String)
  @Column()
  type: string;

  @Field(() => Float, { nullable: true })
  @Column({ name: 'used_at' })
  usedAt: Date;

  @Field(() => Float)
  @Column({ name: 'expired_at' })
  expiredAt: Date;
}

export default UserToken;
