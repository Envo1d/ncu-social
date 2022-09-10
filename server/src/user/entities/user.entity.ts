import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  passwordHash: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  country: string;
}
