import { OrderPartInput } from '.'
import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UpdateOrderInput {
	@Field(() => ID)
	@IsString()
	@IsNotEmpty()
	readonly id: string

	@IsNotEmpty()
	@Field(() => [OrderPartInput])
	readonly productsInfo: OrderPartInput[]
}
