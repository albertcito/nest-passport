import BaseDataEntity from '@/services/model/BaseEntity';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'user_role', schema: 'people' })
export default class UserRole extends BaseDataEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'role_id' })
  roleID: string;

  @Column({ name: 'user_id' })
  userID: number;
}
