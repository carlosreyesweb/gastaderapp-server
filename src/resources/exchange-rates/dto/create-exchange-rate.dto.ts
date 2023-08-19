import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateExchangeRateDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  fromCurrencyId: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  toCurrencyId: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  rate: number;
}
