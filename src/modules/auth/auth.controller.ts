import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CookieOptions, Response } from 'express';
import { UserEntity } from '../users/entities/user.entity';
import { UserNotFoundException } from '../users/exceptions/user-not-found.exception';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { SESSION_COOKIE_NAME } from './constants/session-cookie-name.constant';
import { Cookies } from './decorators/cookies.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';
import { WrongPasswordException } from './exceptions/wrong-password.exception';
import { PasswordCryptService } from './services/password-crypt/password-crypt.service';

const SESSION_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  signed: true,
};

@Controller('auth')
@ApiTags('Autenticación')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly passwordCryptService: PasswordCryptService,
  ) {}

  @Post('login')
  @SkipAuth()
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UserNotFoundException();
    const userId = user.id;

    const isPasswordValid = await this.passwordCryptService.comparePasswords(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) throw new WrongPasswordException();

    const session = await this.authService.createSession(userId);
    res.cookie(SESSION_COOKIE_NAME, session.sessionId, {
      ...SESSION_COOKIE_OPTIONS,
      expires: session.expiresAt,
    });

    return new UserEntity(user);
  }

  @Post('register')
  @SkipAuth()
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password, name, username } = registerDto;

    const existentByEmail = await this.usersService.findByEmail(email);
    if (existentByEmail) throw new UserAlreadyExistsException(email);

    const existentByUsername = await this.usersService.findByUsername(username);
    if (existentByUsername) throw new UserAlreadyExistsException(username);

    const passwordHash = await this.passwordCryptService.hashPassword(password);

    const user = await this.usersService.create({
      name,
      username,
      email,
      passwordHash,
    });

    const session = await this.authService.createSession(user.id);
    res.cookie(SESSION_COOKIE_NAME, session.sessionId, {
      ...SESSION_COOKIE_OPTIONS,
      expires: session.expiresAt,
    });

    return new UserEntity(user);
  }

  @Delete('logout')
  async logout(
    @Cookies(SESSION_COOKIE_NAME) sessionId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.deleteSession(sessionId);
    res.clearCookie(SESSION_COOKIE_NAME);
  }
}
