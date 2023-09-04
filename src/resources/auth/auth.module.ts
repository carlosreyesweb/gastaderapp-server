import { Module, forwardRef } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { PasswordCryptService } from './services/password-crypt/password-crypt.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordCryptService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({ signOptions: { expiresIn: '1d' } }),
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
