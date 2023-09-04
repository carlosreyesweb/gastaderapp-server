import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserNotFoundException } from 'src/modules/users/exceptions/user-not-found.exception';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from '../../auth.service';
import { SKIP_AUTH_KEY } from '../../decorators/skip-auth.decorator';
import { InvalidTokenException } from '../../exceptions/invalid-token.exception';
import { MissingAuthorizationException } from '../../exceptions/missing-authorization.exception';
import { MissingSessionException } from '../../exceptions/missing-session.exception';
import { NoTokenException } from '../../exceptions/no-token.exception';
import { TokenExpiredException } from '../../exceptions/token-expired.exception';
import { JWTPayload } from '../../types/jwt-payload.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
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

    const authorization = request.headers.authorization;
    if (!authorization) throw new MissingAuthorizationException();

    const token = authorization.replace('Bearer ', '');
    if (!token) throw new NoTokenException();

    const decoded = this.jwtService.decode(token) as JWTPayload | null;
    if (!decoded || !decoded.userId) throw new InvalidTokenException();
    const { userId } = decoded;

    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UserNotFoundException(
        'El usuario que intentas autenticar no existe.',
      );
    }

    const session = await this.authService.findSession(userId);
    if (!session) throw new MissingSessionException();

    try {
      await this.jwtService.verifyAsync(token, {
        secret: session.secret,
        ignoreExpiration: false,
      });
    } catch (error) {
      if (error.expiredAt) {
        await this.authService.deleteSession(userId);
        throw new TokenExpiredException();
      }
      throw new InvalidTokenException();
    }

    request.user = user;

    return true;
  }
}
