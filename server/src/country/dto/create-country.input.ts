import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateCountryInput {
	@Field(() => String)
	readonly title: string
}
