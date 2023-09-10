import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { ExpiredSessionException } from 'src/modules/sessions/exceptions/expired-session.exception';
import { SessionNotFoundException } from 'src/modules/sessions/exceptions/session-not-found.exception';
import { SessionsService } from 'src/modules/sessions/sessions.service';
import { SESSION_COOKIE_NAME } from '../../constants/session-cookie-name.constant';
import { SKIP_AUTH_KEY } from '../../decorators/skip-auth.decorator';
import { MissingSessionCookieException } from '../../exceptions/missing-session-cookie.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const sessionId: string = request.signedCookies[SESSION_COOKIE_NAME];
    if (!sessionId) throw new MissingSessionCookieException();

    try {
      const session = await this.sessionsService.findOne(sessionId);

      if (session.expiresAt < new Date()) {
        await this.sessionsService.remove(session.id);
        throw new ExpiredSessionException();
      }

      request.session = session;

      return true;
    } catch (error) {
      response.clearCookie(SESSION_COOKIE_NAME);

      if (error instanceof SessionNotFoundException) {
        throw new UnauthorizedException(
          'Sesión no encontrada. Por favor, inicia sesión nuevamente.',
        );
      }

      throw error;
    }
  }
}
