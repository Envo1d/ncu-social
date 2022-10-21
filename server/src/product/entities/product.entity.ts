import { Category } from 'category/entities/category.entity'
import { ObjectType, Field, ID, Float } from '@nestjs/graphql'
import { User } from 'user/entities/user.entity'
import { ProductOrder } from 'order/entities'

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

	@Field(() => [ProductOrder], { nullable: true })
	orders?: ProductOrder[]

	@Field(() => Float)
	price: number

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
