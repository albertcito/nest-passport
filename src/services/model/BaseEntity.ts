import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { CreateDateColumn, Column, DeleteDateColumn } from 'typeorm';

@ObjectType()
class BaseDataEntity {
  @Field(() => Float)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => Float, { nullable: true })
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'created_by', nullable: true })
  createdBy?: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'updated_by', nullable: true })
  updatedBy?: number;

  @DeleteDateColumn({ name: 'delete_at' })
  deletedAt?: Date;

  @Field(() => String)
  @Column({ name: 'ip_address' })
  ipAddress?: string;
}

export default BaseDataEntity;
