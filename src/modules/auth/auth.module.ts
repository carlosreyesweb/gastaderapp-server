import { Module, forwardRef } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { PasswordCryptService } from './services/password-crypt/password-crypt.service';
import { SessionRepository } from './session.repository';

@Module({
  imports: [PrismaModule, forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [
    SessionRepository,
    PasswordCryptService,
    AuthService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [PasswordCryptService, AuthService],
})
export class AuthModule {}
