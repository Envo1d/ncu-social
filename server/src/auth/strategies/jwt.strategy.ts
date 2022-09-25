import { JwtPayload } from './../../types'
import { PrismaService } from './../../prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '@prisma/client'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private readonly config: ConfigService,
		private readonly prisma: PrismaService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: config.get<string>('JWT_SECRET'),
		})
	}

	async validate(payload: JwtPayload) {
		return this.prisma.user.findUnique({
			where: {
				id: payload._id,
			},
		})
	}
}
