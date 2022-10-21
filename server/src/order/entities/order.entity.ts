import { ObjectType, Field, ID } from '@nestjs/graphql'
import { OrderStatus } from '@prisma/client'
import { User } from '../../user/entities/user.entity'
import { ProductOrder } from '.'

@ObjectType()
export class Order {
	@Field(() => ID)
	id: string

	@Field(() => [ProductOrder])
	products: ProductOrder[]

	@Field(() => String)
	status: OrderStatus

	@Field(() => User)
	customer: User

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
