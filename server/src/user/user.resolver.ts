import { VerifyEmailInput } from './dto'
import { GqlAuthGuard } from './../auth/guards/gql.guard'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { CurrentUser } from './decorators'
import { UseGuards } from '@nestjs/common'
import { Auth } from 'src/auth/decorators'

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@UseGuards(GqlAuthGuard)
	@Query(() => User)
	async profile(@CurrentUser() user: User) {
		return await this.userService.getById(user.id)
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => Boolean)
	async sendVerificationCode(@CurrentUser() user: User) {
		return await this.userService.sendVerificationCode(user.email)
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Boolean)
	async veryfiEmail(
		@Args('data') input: VerifyEmailInput,
		@CurrentUser() user: User
	) {
		return await this.userService.veryfiEmail(input, user.id)
	}
}
