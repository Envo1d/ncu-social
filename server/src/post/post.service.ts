import { PrismaService } from './../prisma/prisma.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreatePostInput } from './dto'
import { createWriteStream } from 'fs'
import { join } from 'path'

@Injectable()
export class PostService {
	constructor(private readonly prisma: PrismaService) {}

	async createPost(input: CreatePostInput, userId: string) {
		let contentUrl = ''
		if (input.content !== undefined) {
			const { createReadStream, filename } = await input.content
			createReadStream
				.pipe(createWriteStream(join(process.cwd(), `./upload/${filename}`)))
				.on('finish', () => {
					contentUrl = `./upload/${filename}`
				})
				.on('error', () => {
					new HttpException('Could not save image', HttpStatus.BAD_REQUEST)
				})
		}

		const post = await this.prisma.post.create({
			data: {
				title: input.title,
				text: input.text,
				contentUrl,
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
