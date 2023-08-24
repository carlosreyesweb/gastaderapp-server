import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { UserEntity } from 'src/resources/users/entities/user.entity';
import { UserNotFoundException } from 'src/resources/users/exceptions/user-not-found.exception';
import { UsersService } from 'src/resources/users/users.service';
import { AuthService } from '../../auth.service';
import { InvalidTokenPayloadException } from '../../exceptions/invalid-token-payload.exception';
import { InvalidTokenException } from '../../exceptions/invalid-token.exception';
import { MissingAuthorizationException } from '../../exceptions/missing-authorization.exception';
import { MissingSessionException } from '../../exceptions/missing-session.exception';
import { NoTokenException } from '../../exceptions/no-token.exception';
import { TokenExpiredException } from '../../exceptions/token-expired.exception';
import { JwtService } from '../../services/jwt/jwt.service';
import { JWTPayload } from '../../types/jwt-payload.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly users: UsersService,
    private readonly auth: AuthService,
    private readonly jwt: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request & { user?: UserEntity } = context
      .switchToHttp()
      .getRequest();

    const authorization = request.headers.authorization;
    if (!authorization) throw new MissingAuthorizationException();

    const token = authorization.replace('Bearer ', '');
    if (!token) throw new NoTokenException();

    const decoded = this.jwt.decode(token) as JWTPayload;
    if (!decoded) throw new InvalidTokenException();
    if (!decoded.userId) throw new InvalidTokenPayloadException();
    const { userId } = decoded;

    const user = await this.users.findOne(userId);
    if (!user) {
      throw new UserNotFoundException(
        'El usuario que intentas autenticar no existe.',
      );
    }

    const session = await this.auth.findSession(userId);
    if (!session) throw new MissingSessionException();

    try {
      this.jwt.verify(token, session.secret, {
        ignoreExpiration: false,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        await this.auth.deleteSession(userId);
        throw new TokenExpiredException();
      }
      throw new InvalidTokenException();
    }

    request.user = user;

    return true;
  }
}
