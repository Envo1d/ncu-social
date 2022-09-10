import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtService } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  providers: [AuthResolver, AuthService, JwtService, AtStrategy, RtStrategy]
})
export class AuthModule {}
