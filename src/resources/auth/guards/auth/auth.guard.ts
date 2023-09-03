import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { UserEntity } from 'src/resources/users/entities/user.entity';
import { UserNotFoundException } from 'src/resources/users/exceptions/user-not-found.exception';
import { UsersService } from 'src/resources/users/users.service';
import { AuthService } from '../../auth.service';
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
  ) {}

  async canActivate(context: ExecutionContext) {
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
