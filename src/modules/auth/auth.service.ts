import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  createSession(userId: number) {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    return this.prismaService.session.create({
      data: { userId, expiresAt },
    });
  }

  findAllSessions(userId: number) {
    return this.prismaService.session.findMany({
      where: {
        userId,
      },
    });
  }

  findSession(sessionId: string) {
    return this.prismaService.session.findUnique({
      where: {
        sessionId,
      },
      include: {
        user: true,
      },
    });
  }

  deleteSession(sessionId: string) {
    return this.prismaService.session.delete({
      where: {
        sessionId,
      },
    });
  }

  deleteAllSessions(userId: number) {
    return this.prismaService.session.deleteMany({
      where: {
        userId,
      },
    });
  }

  deleteExpiredSessions() {
    return this.prismaService.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
