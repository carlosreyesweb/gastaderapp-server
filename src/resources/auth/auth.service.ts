import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { JwtService } from './services/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async authenticate(userId: number) {
    const secret = crypto.randomBytes(16).toString('hex');
    const session = await this.prisma.session.upsert({
      where: {
        userId,
      },
      update: {
        secret,
      },
      create: {
        userId,
        secret,
      },
    });

    const token = this.jwt.sign({ userId }, session.secret);

    return token;
  }

  findSession(userId: number) {
    return this.prisma.session.findUnique({
      where: {
        userId,
      },
    });
  }

  deleteSession(userId: number) {
    return this.prisma.session.delete({
      where: {
        userId,
      },
    });
  }
}
