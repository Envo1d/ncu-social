import { PrismaService } from './../prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreatePostInput } from './dto'

@Injectable()
export class PostService {
	constructor(private readonly prisma: PrismaService) {}

	async createPost(input: CreatePostInput, userId: string) {
		const post = await this.prisma.post.create({
			data: {
				title: input.title,
				text: input.text,
				contentUrl: input?.contentUrl,
				author: {
					connect: {
						id: userId,
					},
				},
			},
			include: {
				author: true,
			},
		})
		return post
	}
}
