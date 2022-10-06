import { JwtService } from '@nestjs/jwt'
import { Prisma, User } from '@prisma/client'
import { LoginInput } from './dto/login.input'
import { PrismaService } from './../prisma/prisma.service'
import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { RegisterInput, SignResult } from './dto'
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly config: ConfigService
	) {}

	async register(input: RegisterInput): Promise<SignResult> {
		try {
			const passHash = await argon.hash(input.password)

			const user = await this.prisma.user.create({
				data: {
					username: input.username,
					email: input.email,
					firstName: input.firstName,
					lastName: input.lastName,
					passwordHash: passHash,
				},
			})

			const tokens = await this.issueTokenPair(user.id)
			return {
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken,
				user,
			}
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					if (e.message.includes('username'))
						throw new BadRequestException(
							'User with this username is already in the system'
						)
					else
						throw new BadRequestException(
							'User with this email is already in the system'
						)
				}
			} else console.log(e)
		}
	}

	async login(input: LoginInput): Promise<SignResult> {
		const user = await this.validateUser(input)
		const tokens = await this.issueTokenPair(user.id)
		return {
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
			user,
		}
	}

	async getNewTokens(token: string): Promise<SignResult> {
		if (!token) throw new ForbiddenException('Could not refresh access token')
		const result = await this.jwtService.verifyAsync(token, {
			secret: this.config.get<string>('JWT_SECRET'),
		})
		if (!result) throw new UnauthorizedException('Invalid token or expired!')
		const user = await this.prisma.user.findUnique({
			where: {
				id: result._id,
			},
		})
		const tokens = await this.issueTokenPair(user.id)
		return {
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
			user,
		}
	}

	async validateUser(input: LoginInput): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: {
				email: input.email.toLowerCase(),
			},
		})

		if (!user) throw new UnauthorizedException('User not found')

		const isValidPass = await argon.verify(user.passwordHash, input.password)
		if (!isValidPass) new UnauthorizedException('Invalid password')

		return user
	}

	async issueTokenPair(userId: string) {
		const data = { _id: userId }

		const refreshToken = await this.jwtService.signAsync(data, {
			secret: this.config.get<string>('JWT_SECRET'),
			expiresIn: this.config.get<string>('REFRESH_TOKEN_EXPIRY_DURATION'),
		})

		const accessToken = await this.jwtService.signAsync(data, {
			secret: this.config.get<string>('JWT_SECRET'),
			expiresIn: this.config.get<string>('ACCESS_TOKEN_EXPIRY_DURATION'),
		})

		return { refreshToken, accessToken }
	}
}
