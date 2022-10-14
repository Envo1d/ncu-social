import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateCategoryInput {
	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	readonly title: string

	@IsString()
	@Field(() => String)
	readonly generalCategoryId: string
}
