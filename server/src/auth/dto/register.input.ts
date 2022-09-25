import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @Field()
  @IsString()
  readonly country: string;

  @Field()
  @IsString()
  readonly gender: string;
}
