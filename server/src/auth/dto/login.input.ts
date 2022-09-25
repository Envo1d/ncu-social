import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
