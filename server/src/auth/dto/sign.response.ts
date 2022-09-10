import { UserInfoResponse } from './../../user/dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
export class SignResponse {
  @IsString()
  @IsNotEmpty()
  @Field()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  refreshToken: string;

  @Field(() => UserInfoResponse)
  user: UserInfoResponse;
}
