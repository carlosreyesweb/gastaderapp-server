import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateExchangeRateDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  fromCurrencyId: number;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  toCurrencyId: number;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  rate: number;
}
