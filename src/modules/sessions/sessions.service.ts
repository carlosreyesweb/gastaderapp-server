import { Injectable } from '@nestjs/common';
import { SessionEntity } from './entities/session.entity';
import { SessionNotFoundException } from './exceptions/session-not-found.exception';
import { SessionsRepository } from './sessions.repository';

@Injectable()
export class SessionsService {
  constructor(private readonly sessionsRepository: SessionsRepository) {}

  async create(userId: number) {
    const session = await this.sessionsRepository.create(userId);

    return new SessionEntity(session);
  }

  async findAll(userId: number) {
    const sessions = await this.sessionsRepository.findAll(userId);

    return sessions.map((session) => new SessionEntity(session));
  }

  async findOne(id: string) {
    const session = await this.sessionsRepository.findOne(id);
    if (!session) throw new SessionNotFoundException();

    return new SessionEntity(session);
  }

  async remove(id: string) {
    await this.sessionsRepository.remove(id);
  }

  async removeAll(userId: number) {
    await this.sessionsRepository.removeAll(userId);
  }
}
