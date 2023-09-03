import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../users/entities/user.entity';
import { UserNotFoundException } from '../users/exceptions/user-not-found.exception';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';
import { WrongPasswordException } from './exceptions/wrong-password.exception';
import { PasswordCryptService } from './services/password-crypt/password-crypt.service';

@Controller('auth')
@ApiTags('Autenticación')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordCryptService: PasswordCryptService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UserNotFoundException();
    const userId = user.id;

    const isPasswordValid = await this.passwordCryptService.comparePasswords(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) throw new WrongPasswordException();

    const session = await this.authService.upsertSession(userId);
    const token = await this.jwtService.signAsync(
      { userId },
      { secret: session.secret },
    );

    return { user: new UserEntity(user), token };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
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

    const session = await this.authService.upsertSession(user.id);
    const token = await this.jwtService.signAsync(
      { userId: user.id },
      { secret: session.secret },
    );

    return { user: new UserEntity(user), token };
  }
}
