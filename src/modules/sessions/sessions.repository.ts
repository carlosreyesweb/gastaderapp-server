import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma/prisma.repository';

@Injectable()
export class SessionsRepository {
  constructor(private readonly prismaRepository: PrismaRepository) {}

  create(userId: number) {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    return this.prismaRepository.session.create({
      data: { userId, expiresAt },
    });
  }

  findAll(userId: number) {
    return this.prismaRepository.session.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(id: string) {
    return this.prismaRepository.session.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  remove(id: string) {
    return this.prismaRepository.session.delete({
      where: { id },
    });
  }

  removeAll(userId: number) {
    return this.prismaRepository.session.deleteMany({
      where: { userId },
    });
  }
}
