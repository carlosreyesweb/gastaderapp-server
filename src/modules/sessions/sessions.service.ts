import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SessionEntity } from './entities/session.entity';
import { SessionNotFoundException } from './exceptions/session-not-found.exception';

@Injectable()
export class SessionsService {
  private readonly sessions;

  constructor(private readonly prismaService: PrismaService) {
    this.sessions = this.prismaService.session;
  }

  async create(userId: number) {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
    const session = await this.sessions.create({
      data: { userId, expiresAt },
    });

    return new SessionEntity(session);
  }

  async findAll(userId: number) {
    const sessions = await this.sessions.findMany({
      where: { userId },
    });

    return sessions.map((session) => new SessionEntity(session));
  }

  async findOne(id: string) {
    const session = await this.sessions.findUnique({
      where: { id },
    });
    if (!session) throw new SessionNotFoundException();

    return new SessionEntity(session);
  }

  async remove(id: string) {
    await this.sessions.delete({ where: { id } });
  }

  async removeAll(userId: number) {
    await this.sessions.deleteMany({ where: { userId } });
  }
}
