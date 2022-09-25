import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getJwtConfig = async (
	config: ConfigService
): Promise<JwtModuleOptions> => ({
	secret: config.get<string>('JWT_SECRET'),
})
