import { GqlAuthGuard } from './../auth/guards/gql.guard'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { CurrentUser } from './decorators'
import { UseGuards } from '@nestjs/common'

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [User])
	async users() {
		return await this.userService.getAll()
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => User)
	async profile(@CurrentUser() user: User) {
		return await this.userService.getById(user.id)
	}
}
