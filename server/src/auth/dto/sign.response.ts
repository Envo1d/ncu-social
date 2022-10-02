import { UserInfoResponse } from '../../user/dto'
import { Field, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@ObjectType()
export class SignResponse {
	@Field()
	@IsString()
	@IsNotEmpty()
	id: string

	@IsString()
	@IsNotEmpty()
	@Field()
	accessToken: string

	@Field(() => UserInfoResponse)
	user: UserInfoResponse
}
