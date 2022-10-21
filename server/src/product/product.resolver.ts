import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ProductService } from './product.service'
import { Product } from './entities/product.entity'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'
import { Auth } from '../auth/decorators'
import { CurrentUser } from '../user/decorators'
import { User } from '../user/entities/user.entity'

@Resolver(() => Product)
export class ProductResolver {
	constructor(private readonly productService: ProductService) {}

	@Auth()
	@Mutation(() => Boolean)
	async createProduct(
		@Args('data') input: CreateProductInput,
		@CurrentUser() user: User
	) {
		return await this.productService.create(input, user.id)
	}

	@Auth()
	@Query(() => [Product], { name: 'products' })
	async findAll() {
		return await this.productService.findAll()
	}

	@Auth()
	@Query(() => Product, { name: 'product' })
	async findOne(@Args('id', { type: () => String }) id: string) {
		return await this.productService.findOne(id)
	}

	@Auth()
	@Mutation(() => Product)
	async updateProduct(@Args('data') updateProductInput: UpdateProductInput) {
		return await this.productService.update(updateProductInput)
	}

	@Auth()
	@Mutation(() => Product)
	async removeProduct(@Args('id', { type: () => String }) id: string) {
		return await this.productService.remove(id)
	}
}
