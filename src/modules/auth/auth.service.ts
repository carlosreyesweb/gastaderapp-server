import { Injectable } from '@nestjs/common';
import { PasswordsService } from '../passwords/passwords.service';
import { SessionsService } from '../sessions/sessions.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly passwordsService: PasswordsService,
    private readonly usersService: UsersService,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.usersService.findByEmail(email);

    await this.passwordsService.compare(password, user.passwordHash);

    return this.sessionsService.create(user.id);
  }

  async register(dto: RegisterDto) {
    const { email, password, name, username } = dto;

    const user = await this.usersService.create({
      name,
      username,
      email,
      password,
    });

    return this.sessionsService.create(user.id);
  }

  logout(sessionId: string) {
    return this.sessionsService.remove(sessionId);
  }

  logoutAll(userId: number) {
    return this.sessionsService.removeAll(userId);
  }
}
