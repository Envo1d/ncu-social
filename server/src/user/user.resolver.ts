import { VerifyEmailInput } from './dto'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { CurrentUser } from './decorators'
import { Auth } from 'src/auth/decorators'

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Query(() => User)
	async profile(@CurrentUser() user: User) {
		return await this.userService.getById(user.id)
	}

	@Auth('ADMIN')
	@Query(() => [User])
	async getAll() {
		return this.userService.getAll()
	}

	@Auth()
	@Query(() => Boolean)
	async sendVerificationCode(@CurrentUser() user: User) {
		return await this.userService.sendVerificationCode(user.email)
	}

	@Auth()
	@Mutation(() => Boolean)
	async verifyEmail(
		@Args('data') input: VerifyEmailInput,
		@CurrentUser() user: User
	) {
		return await this.userService.verifyEmail(input, user.id)
	}
}
