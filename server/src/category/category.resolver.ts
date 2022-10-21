import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CategoryService } from './category.service'
import { Category } from './entities/category.entity'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'
import { Auth } from 'auth/decorators'

@Resolver(() => Category)
export class CategoryResolver {
	constructor(private readonly categoryService: CategoryService) {}

	@Auth('MODERATOR')
	@Mutation(() => Boolean)
	async createCategory(@Args('data') input: CreateCategoryInput) {
		return await this.categoryService.create(input)
	}

	@Auth()
	@Query(() => [Category], { name: 'categories' })
	async findAll() {
		return await this.categoryService.findAll()
	}

	@Auth('MODERATOR')
	@Query(() => Category, { name: 'category' })
	async findOne(@Args('id', { type: () => String }) id: string) {
		return await this.categoryService.findOne(id)
	}

	@Auth('MODERATOR')
	@Mutation(() => Boolean)
	async updateCategory(@Args('data') input: UpdateCategoryInput) {
		return await this.categoryService.update(input.id, input)
	}

	@Auth('MODERATOR')
	@Mutation(() => Boolean)
	async removeCategory(@Args('id', { type: () => String }) id: string) {
		return await this.categoryService.remove(id)
	}
}
