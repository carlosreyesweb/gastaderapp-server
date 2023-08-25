import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  passwordHash: string;
}