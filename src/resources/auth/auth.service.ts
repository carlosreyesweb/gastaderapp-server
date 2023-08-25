import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  upsertSession(userId: number) {
    const secret = crypto.randomBytes(16).toString('hex');

    return this.prismaService.session.upsert({
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
    return this.prismaService.session.findUnique({
      where: {
        userId,
      },
    });
  }

  deleteSession(userId: number) {
    return this.prismaService.session.delete({
      where: {
        userId,
      },
    });
  }
}
