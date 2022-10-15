import { Order } from './../../order/entities/order.entity'
import { Category } from './../../category/entities/category.entity'
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class Product {
	@Field(() => ID)
	id: string

	@Field(() => String)
	title: string

	@Field(() => String)
	imagesUrl: string

	@Field(() => String)
	description: string

	@Field(() => User)
	owner: User

	@Field(() => String)
	ownerId: string

	@Field(() => [Category])
	categories: Category[]

	@Field(() => [Order], { nullable: true })
	orders?: Order[]

	@Field(() => Float)
	price: number

	@Field(() => Int, { nullable: true })
	amount?: number

	@Field(() => Int)
	totalAmount: number

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
