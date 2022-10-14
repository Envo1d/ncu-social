import { Product } from './../../product/entities/product.entity'
import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Category {
	@Field(() => ID)
	id: string

	@Field(() => String)
	title: string

	@Field(() => String, { nullable: true })
	generalCategoryId?: string

	@Field(() => Category, { nullable: true })
	generalCategory?: Category

	@Field(() => String, { nullable: true })
	productId?: string

	@Field(() => Product, { nullable: true })
	product?: Product

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
