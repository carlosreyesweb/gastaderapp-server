import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordCryptService } from './services/password-crypt/password-crypt.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordCryptService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({ signOptions: { expiresIn: '1d' } }),
  ],
  exports: [JwtModule, AuthService, PasswordCryptService],
})
export class AuthModule {}
