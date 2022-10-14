import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class RegisterInput {
	@Field(() => String)
	@IsEmail()
	@IsNotEmpty()
	readonly email: string

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	readonly username: string

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	readonly firstName: string

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	readonly lastName: string

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	readonly country: string

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	readonly password: string
}
