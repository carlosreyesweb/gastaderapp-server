import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PasswordsModule } from '../passwords/passwords.module';
import { SessionsModule } from '../sessions/sessions.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth/auth.guard';

@Module({
  imports: [SessionsModule, PasswordsModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  exports: [AuthService],
})
export class AuthModule {}
