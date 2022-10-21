import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator'
import { CategoryPartInput } from './category.part.input'

@InputType()
export class CreateCategoryInput {
	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	readonly title: string

	@IsObject()
	@IsOptional()
	@Field(() => CategoryPartInput, { nullable: true })
	readonly general: CategoryPartInput
}
