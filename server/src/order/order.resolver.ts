import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { OrderService } from './order.service'
import { Order } from './entities/order.entity'
import { CreateOrderInput } from './dto/create-order.input'
import { UpdateOrderInput } from './dto/update-order.input'
import { CurrentUser } from '../user/decorators'
import { User } from '../user/entities/user.entity'
import { Auth } from 'auth/decorators'

@Resolver(() => Order)
export class OrderResolver {
	constructor(private readonly orderService: OrderService) {}

	@Auth()
	@Mutation(() => Order)
	async createOrder(
		@Args('data') input: CreateOrderInput,
		@CurrentUser() user: User
	) {
		return await this.orderService.create(input, user.id)
	}

	@Auth('MODERATOR')
	@Query(() => [Order], { name: 'orders' })
	async findAll() {
		return await this.orderService.findAll()
	}

	@Auth('MODERATOR')
	@Query(() => Order, { name: 'order' })
	async findOne(@Args('id', { type: () => String }) id: string) {
		return await this.orderService.findOne(id)
	}

	@Auth('MODERATOR')
	@Mutation(() => Boolean)
	async updateOrder(@Args('data') updateOrderInput: UpdateOrderInput) {
		return await this.orderService.update(updateOrderInput)
	}

	@Auth()
	@Mutation(() => Boolean)
	async removeOrder(@Args('id', { type: () => String }) id: string) {
		return await this.orderService.remove(id)
	}
}
