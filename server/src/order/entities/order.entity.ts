import { Product } from './../../product/entities/product.entity'
import { ObjectType, Field, ID, Float } from '@nestjs/graphql'
import { OrderStatus } from '@prisma/client'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class Order {
	@Field(() => ID)
	id: string

	@Field(() => [Product])
	products: Product[]

	@Field(() => Float)
	totalPrice: number

	@Field(() => String)
	status: OrderStatus

	@Field(() => User)
	customer: User

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
