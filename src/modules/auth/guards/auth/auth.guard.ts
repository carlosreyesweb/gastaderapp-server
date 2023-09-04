import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { AuthService } from '../../auth.service';
import { SESSION_COOKIE_NAME } from '../../constants/session-cookie-name.constant';
import { SKIP_AUTH_KEY } from '../../decorators/skip-auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    const request = context
      .switchToHttp()
      .getRequest<ExtendedRequest<{ user?: UserEntity }>>();

    const response = context.switchToHttp().getResponse<Response>();

    const sessionId = request.signedCookies[SESSION_COOKIE_NAME];
    if (!sessionId) {
      throw new UnauthorizedException('No se ha iniciado sesión.');
    }

    const session = await this.authService.findSession(sessionId);
    if (!session) {
      throw new UnauthorizedException(
        'Sesión no encontrada. Por favor, inicia sesión nuevamente.',
      );
    }

    if (session.expiresAt < new Date()) {
      await this.authService.deleteSession(sessionId);
      response.clearCookie(SESSION_COOKIE_NAME);
      throw new UnauthorizedException(
        'Sesión expirada. Por favor, inicia sesión nuevamente.',
      );
    }

    request.user = session.user;

    return true;
  }
}
