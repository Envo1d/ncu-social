import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async create(input: CreateProductInput, userId: string) {
		const user = await this.prisma.user.findUnique({ where: { id: userId } })
		if (!user) throw new UnauthorizedException('User not found')
		await this.prisma.product.create({
			data: {
				title: input.title,
				description: input.description,
				categories: {
					connect: JSON.parse(input.categoriesId),
				},
				price: input.price,
				totalAmount: input.totalAmount,
				owner: {
					connect: {
						id: userId,
					},
				},
				imagesUrl: '',
			},
		})
		return true
	}

	async findAll() {
		return await this.prisma.product.findMany({
			include: {
				orders: true,
				categories: true,
				owner: true,
			},
		})
	}

	async findOne(id: string) {
		return await this.prisma.product.findUnique({
			where: {
				id,
			},
			include: {
				orders: true,
				categories: true,
				owner: true,
			},
		})
	}

	async update(id: string, input: UpdateProductInput) {
		const product = await this.prisma.product.findUnique({
			where: {
				id,
			},
		})
		if (!product) throw new BadRequestException('Product not exist')
		await this.prisma.product.update({
			where: {
				id,
			},
			data: {
				title: input.title,
				description: input.description,
				categories: {
					connect: JSON.parse(input.categoriesId),
				},
				price: input.price,
				totalAmount: input.totalAmount,
				imagesUrl: '',
			},
		})
		return true
	}

	async remove(id: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				id,
			},
		})
		if (!product) throw new BadRequestException('Product not exist')
		await this.prisma.product.delete({
			where: {
				id,
			},
		})
		return true
	}
}
