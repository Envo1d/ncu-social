import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: SignupDto) {
    // generate the password hash
    const passwordHash = await argon.hash(dto.password);
    // create and save new user in the db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        username: dto.username,
        passwordHash,
        country: dto?.country
      },
    });
    //TODO: change return
    return user;
  }
  signin() {}
  logout() {}
  refreshTokens() {}
}
