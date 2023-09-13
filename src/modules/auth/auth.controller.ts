import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiTags('Autenticación')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @SkipAuth()
  async login(@Body() dto: LoginDto) {
    const accessToken = await this.authService.login(dto);

    return { accessToken };
  }

  @Post('register')
  @SkipAuth()
  async register(@Body() dto: RegisterDto) {
    const accessToken = await this.authService.register(dto);

    return { accessToken };
  }
}
