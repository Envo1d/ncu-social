import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { AdminService } from './admin.service'

@Resolver()
export class AdminResolver {
	constructor(private readonly adminService: AdminService) {}
}
