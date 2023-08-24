import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './services/jwt/jwt.service';
import { PasswordCryptService } from './services/password-crypt/password-crypt.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, PasswordCryptService],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService, JwtService, PasswordCryptService],
})
export class AuthModule {}
