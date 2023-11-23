import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordsService } from '../passwords/passwords.service';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordsService: PasswordsService,
    private readonly usersService: UsersService,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.usersService.findByEmail(email);
    await this.passwordsService.compare(password, user.passwordHash);
    const accessToken = await this._generateAccessToken(user.id);

    return { user: new UserEntity(user), accessToken };
  }

  async register(dto: RegisterDto) {
    const { email, password, name } = dto;
    const user = await this.usersService.create({
      name,
      email,
      password,
    });
    const accessToken = await this._generateAccessToken(user.id);

    return { user: new UserEntity(user), accessToken };
  }

  private _generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ userId });
  }
}
