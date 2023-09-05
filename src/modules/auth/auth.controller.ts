import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CookieOptions, Response } from 'express';
import { Session } from '../sessions/decorators/session.decorator';
import { SessionEntity } from '../sessions/entities/session.entity';
import { AuthService } from './auth.service';
import { SESSION_COOKIE_NAME } from './constants/session-cookie-name.constant';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

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

    res.cookie(SESSION_COOKIE_NAME, session.id, {
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

    res.cookie(SESSION_COOKIE_NAME, session.id, {
      ...SESSION_COOKIE_OPTIONS,
      expires: session.expiresAt,
    });

    res.status(HttpStatus.CREATED);
  }

  @Delete('logout')
  async logout(
    @Session() session: SessionEntity,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(session.id);

    res.clearCookie(SESSION_COOKIE_NAME);
  }

  @Delete('logout-all')
  async logoutAll(
    @Session() session: SessionEntity,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logoutAll(session.userId);

    res.clearCookie(SESSION_COOKIE_NAME);
  }
}
