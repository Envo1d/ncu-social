import { Product } from './../../product/entities/product.entity'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform, Type } from 'class-transformer'
import { OrderStatus } from '@prisma/client'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class Order {
	@Field(() => ID)
	id: string

	@Field(() => [Product])
	products: Product[]

	@Field(() => GraphQLDecimal)
	@Type(() => Object)
	@Transform(transformToDecimal)
	totalPrice: Decimal

	@Field(() => String)
	status: OrderStatus

	@Field(() => User)
	customer: User

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
