import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../user/decorators'
import { Auth } from '../auth/decorators'
import { User } from '../user/entities/user.entity'
import { PostService } from './post.service'
import { CreatePostInput } from './dto'
import { Post } from './entities/post.entity'

@Resolver()
export class PostResolver {
	constructor(private readonly postService: PostService) {}

	@Auth()
	@Mutation(() => Post)
	async createPost(
		@Args('data') input: CreatePostInput,
		@CurrentUser() user: User
	) {
		return await this.postService.createPost(input, user.id)
	}
}
