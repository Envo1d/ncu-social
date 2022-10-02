import { VerifyEmailInput } from './dto/verify-email.input'
import { MailerService } from '@nestjs-modules/mailer'
import { PrismaService } from './../prisma/prisma.service'
import {
	CACHE_MANAGER,
	ForbiddenException,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Cache } from 'cache-manager'
import cuid = require('cuid')

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly mailer: MailerService,
		@Inject(CACHE_MANAGER) private readonly cache: Cache
	) {}

	async getAll() {
		const users = await this.prisma.user.findMany()
		return users
	}

	async getById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
		})
		if (!user) throw new NotFoundException('User not found!')

		return user
	}

	async sendVerificationCode(email: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		})
		if (!user) throw new NotFoundException('User not found!')
		const code = cuid()
		this.mailer
			.sendMail({
				to: email,
				subject: 'Email confirmation',
				template: 'verify',
				context: {
					code,
				},
			})
			.then(async () => {
				await this.cache.set(user.id, code, { ttl: 3600 })
			})
			.catch(() => {
				return false
			})
		return true
	}

	async verifyEmail(input: VerifyEmailInput, userId: string) {
		const code = await this.cache.get(userId)
		if (!code) throw new ForbiddenException('Verification code is not valid')
		if (code === input.verifyCode) {
			await this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					isVerified: true,
				},
			})
			return true
		} else throw new ForbiddenException('Verification code is not valid')
	}
}
