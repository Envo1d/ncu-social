import { PrismaService } from './../prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'
import { Prisma } from '@prisma/client'

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async create(input: CreateCategoryInput) {
		try {
			if (input.general !== null) {
				await this.prisma.category.create({
					data: {
						title: input.title,
						generalCategory: {
							connect: {
								id: input?.general.categoryId,
							},
						},
					},
				})
			} else {
				await this.prisma.category.create({
					data: {
						title: input.title,
					},
				})
			}
			return true
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					if (e.message.includes('title'))
						throw new BadRequestException('Category exist')
				}
			} else console.log(e)
		}
	}

	async findAll() {
		return await this.prisma.category.findMany({
			include: {
				generalCategory: true,
				subcategories: true,
				products: true,
			},
		})
	}

	async findOne(id: string) {
		return await this.prisma.category.findUnique({
			where: {
				id,
			},
		})
	}

	async update(id: string, input: UpdateCategoryInput) {
		const category = await this.prisma.category.findUnique({
			where: {
				id,
			},
		})
		if (!category) throw new BadRequestException('Category not exist')
		if (input.general.categoryId !== null) {
			await this.prisma.category.update({
				where: {
					id,
				},
				data: {
					title: input.title,
					generalCategory: {
						connect: {
							id: input?.general.categoryId,
						},
					},
				},
			})
		} else {
			await this.prisma.category.update({
				where: {
					id,
				},
				data: {
					title: input.title,
				},
			})
		}
		return true
	}

	async remove(id: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				id,
			},
		})
		if (!category) throw new BadRequestException('Category not exist')
		await this.prisma.category.delete({
			where: {
				id,
			},
		})
		return true
	}
}
