import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UpdateCategoryInput {
	@IsString()
	@IsNotEmpty()
	@Field(() => ID)
	readonly id: string

	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	readonly title: string

	@IsString()
	@Field(() => String)
	readonly generalCategoryId?: string
}
