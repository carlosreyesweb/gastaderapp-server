import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  upsertSession(userId: number) {
    const secret = crypto.randomBytes(16).toString('hex');

    return this.prisma.session.upsert({
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
