import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaModule } from './prisma/prisma.module'
import { join } from 'path'
import { UserModule } from './user/user.module'
import type { ClientOpts } from 'ioredis'
import { AuthModule } from './auth/auth.module'
import * as redisStore from 'cache-manager-ioredis'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { PostModule } from './post/post.module'
import { CategoryModule } from './category/category.module'
import { ProductModule } from './product/product.module'
import { OrderModule } from './order/order.module'
import { AdminModule } from './admin/admin.module';

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
			csrfPrevention: true,
			cors: { origin: true, credentials: true },
			context: ({ req, res }) => ({ req, res }),
		}),
		CacheModule.registerAsync<ClientOpts>({
			isGlobal: true,
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				store: redisStore,
				host: config.get<string>('REDIS_HOST'),
				port: config.get<number>('REDIS_PORT'),
				password: config.get<string>('REDIS_PASS'),
				db: 0,
				retryStrategy: () => {
					return 2000
				},
			}),
		}),
		MailerModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				transport: {
					host: config.get<string>('EMAIL_HOST'),
					auth: {
						user: config.get<string>('EMAIL_USER'),
						pass: config.get<string>('EMAIL_PASS'),
					},
					port: config.get<number>('EMAIL_PORT'),
					ignoreTLS: true,
					secure: true,
				},
				template: {
					dir: join(__dirname, 'templates'),
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
				preview: false,
			}),
		}),
		PrismaModule,
		UserModule,
		AuthModule,
		PostModule,
		CategoryModule,
		ProductModule,
		OrderModule,
		AdminModule,
	],
})
export class AppModule {}
