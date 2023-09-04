import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { PasswordCryptService } from './services/password-crypt/password-crypt.service';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordCryptService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {}
