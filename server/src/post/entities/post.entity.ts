import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class Post {
	@Field(() => ID)
	id: string

	@Field(() => String)
	title: string

	@Field(() => String)
	contentUrl: string

	@Field(() => String)
	text: string

	@Field(() => User)
	author: User

	@Field(() => [User], { nullable: true })
	likedBy?: [User]

	@Field(() => Date, { name: 'registeredAt' })
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
