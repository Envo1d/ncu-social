import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreatePostInput {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	readonly title: string

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	readonly text: string

	@Field(() => String)
	@IsString()
	readonly contentUrl: string
}
