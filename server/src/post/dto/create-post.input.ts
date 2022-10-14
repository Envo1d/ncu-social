import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'
import { FileUpload } from '../../types'
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'

@InputType()
export class CreatePostInput {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	readonly title: string

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	readonly text: string

	@Field(() => GraphQLUpload, { nullable: true })
	readonly content?: Promise<FileUpload>
}
