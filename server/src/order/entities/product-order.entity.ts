import { Product } from './../../product/entities/product.entity'
import { ObjectType, Field, ID, Int } from '@nestjs/graphql'
import { Order } from '.'

@ObjectType()
export class ProductOrder {
	@Field(() => ID)
	id: string

	@Field(() => Product)
	product: Product

	@Field(() => String)
	productId: string

	@Field(() => Order)
	order: Order

	@Field(() => String)
	orderId: string

	@Field(() => Int)
	quantity: number

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
