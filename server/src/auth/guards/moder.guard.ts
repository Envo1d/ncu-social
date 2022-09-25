import { Reflector } from '@nestjs/core'
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common'
import { Role, User } from '@prisma/client'
import { GqlExecutionContext } from '@nestjs/graphql'

export class ModeratorGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context)
		const user = ctx.getContext().req.user as User

		if (user.role !== Role.MODERATOR && user.role !== Role.ADMIN)
			throw new ForbiddenException('Not enough rights')

		return true
	}
}
