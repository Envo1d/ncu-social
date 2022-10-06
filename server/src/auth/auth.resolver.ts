import { ConfigService } from '@nestjs/config'
import { GqlContext } from './../types'
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { RegisterInput, LoginInput } from './dto'
import { Query } from '@nestjs/common'
import { Auth } from './decorators'

@Resolver()
export class AuthResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly config: ConfigService
	) {}

	@Mutation(() => Boolean)
	async register(
		@Args('data') input: RegisterInput,
		@Context() { res }: GqlContext
	) {
		const result = await this.authService.register(input)
		res.cookie('accessToken', result.accessToken, {
			maxAge:
				this.config.get<number>('ACCESS_TOKEN_EXPIRY_DURATION_NUM_MINUTES') *
				60000,
		})
		res.cookie('refreshToken', result.refreshToken, {
			maxAge:
				this.config.get<number>('REFRESH_TOKEN_EXPIRY_DURATION_NUM_DAYS') *
				24 *
				60 *
				60 *
				1000,
			httpOnly: true,
		})
		return true
	}

	@Mutation(() => Boolean)
	async getNewTokens(@Context() { req, res }: GqlContext) {
		const refToken = req.cookies.refreshToken
		const result = await this.authService.getNewTokens(refToken)
		res.cookie('accessToken', result.accessToken, {
			maxAge:
				this.config.get<number>('ACCESS_TOKEN_EXPIRY_DURATION_NUM_MINUTES') *
				60000,
		})
		res.cookie('refreshToken', result.refreshToken, {
			maxAge:
				this.config.get<number>('REFRESH_TOKEN_EXPIRY_DURATION_NUM_DAYS') *
				24 *
				60 *
				60 *
				1000,
			httpOnly: true,
		})
		return true
	}

	@Mutation(() => Boolean)
	async login(@Args('data') input: LoginInput, @Context() { res }: GqlContext) {
		const result = await this.authService.login(input)
		res.cookie('accessToken', result.accessToken, {
			maxAge:
				this.config.get<number>('ACCESS_TOKEN_EXPIRY_DURATION_NUM_MINUTES') *
				60000,
		})
		res.cookie('refreshToken', result.refreshToken, {
			maxAge:
				this.config.get<number>('REFRESH_TOKEN_EXPIRY_DURATION_NUM_DAYS') *
				24 *
				60 *
				60 *
				1000,
			httpOnly: true,
		})
		return true
	}

	@Auth()
	@Mutation(() => Boolean)
	async logout(@Context() { res }: GqlContext) {
		res.clearCookie('accessToken')
		res.clearCookie('refreshToken')
		return true
	}
}
