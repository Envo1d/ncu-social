import { InputType, Field, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class OrderPartInput {
	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	readonly productId: string

	@IsNumber()
	@IsNotEmpty()
	@Field(() => Int)
	readonly amount: number
}
