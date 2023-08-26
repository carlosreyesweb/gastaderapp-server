import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  accountNumber?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  balance?: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsInt()
  @IsPositive()
  currencyId: number;
}
