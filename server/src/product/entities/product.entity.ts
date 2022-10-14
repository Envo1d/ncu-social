import { Order } from './../../order/entities/order.entity'
import { Category } from './../../category/entities/category.entity'
import { ObjectType, Field, ID, Int } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform, Type } from 'class-transformer'

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

	@Field(() => GraphQLDecimal)
	@Type(() => Object)
	@Transform(transformToDecimal)
	price: Decimal

	@Field(() => Int, { nullable: true })
	amount?: number

	@Field(() => Int)
	totalAmount: number

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
