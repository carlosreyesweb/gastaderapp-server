import { Body, Controller, Post } from '@nestjs/common';
import { UserNotFoundException } from '../users/exceptions/user-not-found.exception';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';
import { WrongPasswordException } from './exceptions/wrong-password.exception';
import { PasswordCryptService } from './services/password-crypt/password-crypt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly users: UsersService,
    private readonly passwordCrypt: PasswordCryptService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.users.findByEmail(email);
    if (!user) throw new UserNotFoundException();
    const userId = user.id;

    const isPasswordValid = await this.passwordCrypt.comparePasswords(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) throw new WrongPasswordException();

    const token = await this.auth.authenticate(userId);

    return { user, token };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { email, password, name, username } = registerDto;

    const existentByEmail = await this.users.findByEmail(email);
    if (existentByEmail) throw new UserAlreadyExistsException(email);

    const existentByUsername = await this.users.findByUsername(username);
    if (existentByUsername) throw new UserAlreadyExistsException(username);

    const passwordHash = await this.passwordCrypt.hashPassword(password);

    const user = await this.users.create({
      name,
      username,
      email,
      passwordHash,
    });

    const token = await this.auth.authenticate(user.id);

    return { user, token };
  }
}
