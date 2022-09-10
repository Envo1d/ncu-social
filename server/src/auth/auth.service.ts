import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { SigninInput, SignupInput } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(signupInput: SignupInput) {
    const passHash = await argon.hash(signupInput.password);
    const user = await this.prisma.user.create({
      data: {
        username: signupInput.username,
        firstName: signupInput.firstName,
        lastName: signupInput.lastName,
        email: signupInput.email,
        passwordHash: passHash,
        country: signupInput?.country,
      },
    });
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  async signin(signinInput: SigninInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signinInput.email,
      },
    });
    if (!user) throw new ForbiddenException('Access Denied');
    const passwordMatch = await argon.verify(
      user.passwordHash,
      signinInput.password,
    );
    if (!passwordMatch) throw new ForbiddenException('Access Denied');
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: { id: userId, hashedRefreshToken: { not: null } },
      data: {
        hashedRefreshToken: null,
      },
    });
    return { loggedOut: true };
  }

  async createTokens(userId: string, email: string) {
    const accessToken = this.jwt.sign(
      {
        userId,
        email,
      },
      {
        expiresIn: '15m',
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
      },
    );
    const refreshToken = this.jwt.sign(
      {
        userId,
        email,
        accessToken,
      },
      {
        expiresIn: '7d',
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
      },
    );
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }

  async getNewTokens(userId: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('Access Denied');
    const refreshTokensMatch = await argon.verify(user.hashedRefreshToken, rt);
    if (!refreshTokensMatch) throw new ForbiddenException('Access Denied');
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }
}
