import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { MailerService } from '@nestjs-modules/mailer'

@Module({
	providers: [UserResolver, UserService],
})
export class UserModule {}
