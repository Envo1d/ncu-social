import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Country {
	@Field(() => ID)
	id: string

	@Field(() => String)
	title: string
}
