import { SignupDto } from './dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.auth.signup(dto);
  }

  @Post('signin')
  signin() {
    return this.auth.signin();
  }

  @Post('logout')
  logout() {
    return this.auth.logout();
  }

  @Post('refresh')
  refreshTokens() {
    return this.auth.refreshTokens();
  }
}
