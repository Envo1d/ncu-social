import { InputType, Field, Int, Float } from '@nestjs/graphql'
import { IsJSON, IsNotEmpty, IsNumber, IsString } from 'class-validator'

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

	@IsJSON()
	@IsNotEmpty()
	@Field(() => String)
	readonly categoriesId: string

	@IsNotEmpty()
	@Field(() => Float)
	readonly price: number

	@IsNotEmpty()
	@IsNumber()
	@Field(() => Int)
	readonly totalAmount: number
}
