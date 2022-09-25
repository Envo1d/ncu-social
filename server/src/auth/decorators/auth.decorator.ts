import { AdminGuard, GqlAuthGuard, ModeratorGuard } from './../guards'
import { applyDecorators, UseGuards } from '@nestjs/common'
import { Role } from '@prisma/client'

export const Auth = (role: Role = Role.USER) =>
	applyDecorators(
		role === Role.ADMIN
			? UseGuards(GqlAuthGuard, AdminGuard)
			: role === Role.MODERATOR
			? UseGuards(GqlAuthGuard, ModeratorGuard)
			: UseGuards(GqlAuthGuard)
	)
