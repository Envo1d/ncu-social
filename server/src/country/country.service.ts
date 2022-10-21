import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCountryInput, UpdateCountryInput } from './dto'

@Injectable()
export class CountryService {
	constructor(private readonly prisma: PrismaService) {}

	async create(input: CreateCountryInput) {
		try {
			const country = await this.prisma.country.create({
				data: {
					title: input.title,
				},
			})
			return true
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					if (e.message.includes('title'))
						throw new BadRequestException(
							'This country is already in the database'
						)
				}
			} else console.log(e)
		}
	}

	async findAll() {
		return await this.prisma.country.findMany()
	}

	async findOne(id: string) {
		return await this.prisma.country.findUnique({
			where: {
				id,
			},
		})
	}

	async update(input: UpdateCountryInput) {
		const tmp = await this.prisma.country.findUnique({
			where: { id: input.id },
		})
		if (!tmp) throw new BadRequestException('Country not found')
		await this.prisma.country.update({
			where: {
				id: input.id,
			},
			data: {
				title: input.title,
			},
		})
		return true
	}

	async remove(id: string) {
		const tmp = await this.prisma.country.findUnique({
			where: { id },
		})
		if (!tmp) throw new BadRequestException('Country not found')
		await this.prisma.country.delete({
			where: { id },
		})
		return true
	}
}
