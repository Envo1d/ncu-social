import { PrismaService } from './../prisma/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
		})
		if (!user) throw new NotFoundException('User not found!')

		return user
	}

	async getAll() {
		return null
	}
}
