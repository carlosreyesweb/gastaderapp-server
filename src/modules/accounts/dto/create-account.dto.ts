import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateAccountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  accountNumber: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  balance?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  currencyId: number;
}
