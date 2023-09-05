import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CookieOptions, Response } from 'express';
import { User } from '../users/decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { SESSION_COOKIE_NAME } from './constants/session-cookie-name.constant';
import { Cookies } from './decorators/cookies.decorator';
import { Session } from './decorators/session.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SessionEntity } from './entities/session.entity';
import { SessionOwnershipGuard } from './guards/session-ownership/session-ownership.guard';

const SESSION_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  signed: true,
};

@Controller('auth')
@ApiTags('Autenticación')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @SkipAuth()
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const session = await this.authService.login(dto);

    res.cookie(SESSION_COOKIE_NAME, session.sessionId, {
      ...SESSION_COOKIE_OPTIONS,
      expires: session.expiresAt,
    });
    res.status(HttpStatus.OK);
  }

  @Post('register')
  @SkipAuth()
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const session = await this.authService.register(dto);

    res.cookie(SESSION_COOKIE_NAME, session.sessionId, {
      ...SESSION_COOKIE_OPTIONS,
      expires: session.expiresAt,
    });
    res.status(HttpStatus.CREATED);
  }

  @Get('sessions')
  sessions(@User() user: UserEntity) {
    return this.authService.findAllSessions(user.id);
  }

  @Delete('sessions/:id')
  @UseGuards(SessionOwnershipGuard)
  removeSession(@Session() session: SessionEntity) {
    return this.authService.removeSession(session.id);
  }

  @Delete('logout')
  async logout(
    @Cookies(SESSION_COOKIE_NAME) sessionId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.removeSession(sessionId);

    res.clearCookie(SESSION_COOKIE_NAME);
  }

  @Delete('logout-all')
  async logoutAll(
    @User() user: UserEntity,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.removeAllSessions(user.id);

    res.clearCookie(SESSION_COOKIE_NAME);
  }
}
