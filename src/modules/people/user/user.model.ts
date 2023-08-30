import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import argon2 from 'argon2';

import BaseEntity from '../../../services/model/BaseEntity';

@ObjectType()
@Entity({ name: 'user', schema: 'people' })
class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column({ name: 'lang_id' })
  langID: string;

  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column({ name: 'first_name' })
  firstName: string;

  @Field(() => String)
  @Column({ name: 'last_name' })
  lastName: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'bio', nullable: true })
  bio: string;

  @Column()
  password: string;

  @Field(() => Date, { nullable: true })
  @Column({ name: 'email_verified' })
  emailVerified?: Date;

  @Field()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @BeforeInsert()
  async insertRow() {
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;
  }
}

export default User;
