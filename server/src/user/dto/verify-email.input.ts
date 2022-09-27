import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class VerifyEmailInput {
	@IsString()
	@IsNotEmpty()
	@Field()
	verifyCode: string
}
