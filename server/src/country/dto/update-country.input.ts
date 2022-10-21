import { CreateCountryInput } from './create-country.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateCountryInput extends PartialType(CreateCountryInput) {
	@Field(() => ID)
	id: string
}
