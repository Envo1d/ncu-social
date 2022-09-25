import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaModule } from './prisma/prisma.module'
import { join } from 'path'
import { UserModule } from './user/user.module'
import type { ClientOpts } from 'ioredis'
import { AuthModule } from './auth/auth.module'
import * as redisStore from 'cache-manager-ioredis'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: false,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
			cors: { origin: true, credentials: true },
			context: ({ req, res }) => ({ req, res }),
		}),
		// CacheModule.register<ClientOpts>({
		// 	isGlobal: true,
		// 	store: redisStore,
		// 	host: 'redis',
		// 	port: 6379,
		// 	password: 'htlbcgfcc21',
		// 	db: 0,
		// }),
		PrismaModule,
		UserModule,
		AuthModule,
	],
})
export class AppModule {}
