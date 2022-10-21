import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CountryService } from './country.service'
import { Country } from './entities/country.entity'
import { CreateCountryInput } from './dto/create-country.input'
import { UpdateCountryInput } from './dto/update-country.input'
import { Auth } from 'auth/decorators'

@Resolver(() => Country)
export class CountryResolver {
	constructor(private readonly countryService: CountryService) {}

	@Auth('MODERATOR')
	@Mutation(() => Boolean)
	async createCountry(@Args('data') input: CreateCountryInput) {
		return await this.countryService.create(input)
	}

	@Query(() => [Country], { name: 'countries' })
	async findAll() {
		return this.countryService.findAll()
	}

	@Query(() => Country, { name: 'country' })
	async findOne(@Args('id', { type: () => String }) id: string) {
		return await this.countryService.findOne(id)
	}

	@Auth('MODERATOR')
	@Mutation(() => Boolean)
	async updateCountry(@Args('data') input: UpdateCountryInput) {
		return await this.countryService.update(input)
	}

	@Auth('MODERATOR')
	@Mutation(() => Boolean)
	async removeCountry(@Args('id', { type: () => String }) id: string) {
		return await this.countryService.remove(id)
	}
}
