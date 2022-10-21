import { PrismaService } from './../prisma/prisma.service'
import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { CreateOrderInput } from './dto/create-order.input'
import { UpdateOrderInput } from './dto/update-order.input'

@Injectable()
export class OrderService {
	constructor(private readonly prisma: PrismaService) {}

	async create(input: CreateOrderInput, userId: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
		})
		if (!user) throw new UnauthorizedException('User not found')
		const order = await this.prisma.order.create({
			data: {
				customer: {
					connect: {
						id: user.id,
					},
				},
				products: {
					createMany: {
						data: input.productsInfo.map((info) => ({
							productId: info.productId,
							quantity: info.amount,
						})),
					},
				},
			},
			include: {
				products: {
					select: {
						product: {
							select: {
								title: true,
								categories: true,
								price: true,
							},
						},
						quantity: true,
					},
				},
			},
		})
		return order
	}

	async findAll() {
		return await this.prisma.order.findMany({
			include: {
				products: {
					select: {
						product: {
							select: {
								title: true,
								categories: true,
								price: true,
							},
						},
						quantity: true,
					},
				},
				customer: true,
			},
		})
	}

	async findOne(id: string) {
		return await this.prisma.order.findMany({
			where: {
				id,
			},
			include: {
				products: {
					select: {
						product: {
							select: {
								title: true,
								categories: true,
								price: true,
							},
						},
						quantity: true,
					},
				},
				customer: true,
			},
		})
	}

	async update(input: UpdateOrderInput) {
		const order = await this.prisma.order.findUnique({
			where: {
				id: input.id,
			},
		})
		if (!order) throw new BadRequestException('Order not found')
		await this.prisma.order.update({
			where: {
				id: input.id,
			},
			data: {
				products: {
					deleteMany: {},
					createMany: {
						data: input.productsInfo.map((info) => ({
							productId: info.productId,
							quantity: info.amount,
						})),
					},
				},
			},
		})
		return true
	}

	async remove(id: string) {
		const order = await this.prisma.order.findUnique({
			where: {
				id,
			},
		})
		if (!order) throw new BadRequestException('Order not found')
		await this.prisma.order.delete({
			where: { id },
		})
		return true
	}
}
