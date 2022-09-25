import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { getJwtConfig } from './jwt.config'
import { JwtStrategy } from './strategies'

@Module({
	providers: [AuthResolver, AuthService, JwtStrategy],
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
	],
})
export class AuthModule {}
