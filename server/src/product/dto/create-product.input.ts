import { InputType, Field, Float } from '@nestjs/graphql'
import { IsArray, IsNotEmpty, IsString } from 'class-validator'
import { CategoryPartInput } from './../../category/dto'

@InputType()
export class CreateProductInput {
	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	readonly title: string

	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	readonly description: string

	@IsArray()
	@IsNotEmpty()
	@Field(() => [CategoryPartInput])
	readonly categories: CategoryPartInput[]

	@IsNotEmpty()
	@Field(() => Float)
	readonly price: number
}
