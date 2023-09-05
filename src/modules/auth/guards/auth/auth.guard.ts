import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { SessionsService } from 'src/modules/sessions/sessions.service';
import { ExpiredSessionException } from '../../../sessions/exceptions/expired-session.exception';
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

    const session = await this.sessionsService.findOne(sessionId);

    if (session.expiresAt < new Date()) {
      await this.sessionsService.remove(session.id);
      response.clearCookie(SESSION_COOKIE_NAME);

      throw new ExpiredSessionException();
    }

    request.session = session;

    return true;
  }
}
