import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaRepository } from '../prisma/prisma.repository';

@Injectable()
export class SessionRepository {
  constructor(private readonly prismaRepository: PrismaRepository) {}

  create(userId: number) {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    return this.prismaRepository.session.create({
      data: { userId, expiresAt },
      include: {
        user: true,
      },
    });
  }

  findAll(userId: number) {
    return this.prismaRepository.session.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(where: Prisma.SessionWhereUniqueInput) {
    return this.prismaRepository.session.findUnique({
      where,
      include: {
        user: true,
      },
    });
  }

  remove(idOrSessionId: number | string) {
    const isSessionId = typeof idOrSessionId === 'string';

    return this.prismaRepository.session.delete({
      where: isSessionId ? { sessionId: idOrSessionId } : { id: idOrSessionId },
    });
  }

  removeAll(userId: number) {
    return this.prismaRepository.session.deleteMany({
      where: { userId },
    });
  }

  removeExpired() {
    return this.prismaRepository.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
