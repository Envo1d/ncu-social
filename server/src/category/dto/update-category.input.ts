import { InputType, Field, ID, PartialType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'
import { CreateCategoryInput } from './create-category.input'

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
	@IsString()
	@IsNotEmpty()
	@Field(() => ID)
	readonly id: string
}
