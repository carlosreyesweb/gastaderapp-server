import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateExchangeRateDto {
  @ApiProperty()
  @IsUUID()
  fromCurrencyId: string;

  @ApiProperty()
  @IsUUID()
  toCurrencyId: string;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  rate: number;
}
