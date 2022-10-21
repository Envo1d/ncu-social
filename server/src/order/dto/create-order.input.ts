import { InputType, Field } from '@nestjs/graphql'
import { IsArray, IsNotEmpty } from 'class-validator'
import { OrderPartInput } from '.'

@InputType()
export class CreateOrderInput {
	@IsArray()
	@IsNotEmpty()
	@Field(() => [OrderPartInput])
	readonly productsInfo: OrderPartInput[]
}
