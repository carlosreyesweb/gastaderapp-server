import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SessionEntity } from './entities/session.entity';
import { SessionNotFoundException } from './exceptions/session-not-found.exception';
import { WrongPasswordException } from './exceptions/wrong-password.exception';
import { PasswordCryptService } from './services/password-crypt/password-crypt.service';
import { SessionRepository } from './session.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly passwordCryptService: PasswordCryptService,
    private readonly usersService: UsersService,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.usersService.findByEmail(email);
    const userId = user.id;

    const isPasswordValid = await this.passwordCryptService.comparePasswords(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) throw new WrongPasswordException();

    const session = await this.sessionRepository.create(userId);

    return new SessionEntity(session);
  }

  async register(dto: RegisterDto) {
    const { email, password, name, username } = dto;

    const user = await this.usersService.create({
      name,
      username,
      email,
      password,
    });

    const session = await this.sessionRepository.create(user.id);

    return new SessionEntity(session);
  }

  async findSession(idOrSessionId: number | string) {
    const isSessionId = typeof idOrSessionId === 'string';

    const session = await this.sessionRepository.findOne(
      isSessionId ? { sessionId: idOrSessionId } : { id: idOrSessionId },
    );
    if (!session) throw new SessionNotFoundException();

    return new SessionEntity(session);
  }

  async findAllSessions(userId: number) {
    const sessions = await this.sessionRepository.findAll(userId);

    return sessions.map((session) => new SessionEntity(session));
  }

  async removeSession(idOrSessionId: number | string) {
    await this.sessionRepository.remove(idOrSessionId);
  }

  async removeAllSessions(userId: number) {
    await this.sessionRepository.removeAll(userId);
  }
}
