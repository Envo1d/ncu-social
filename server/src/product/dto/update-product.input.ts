import { CreateProductInput } from './create-product.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
	@IsString()
	@IsNotEmpty()
	@Field(() => ID)
	readonly id: string
}
