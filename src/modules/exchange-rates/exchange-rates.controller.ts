import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExchangeRatesService } from './exchange-rates.service';

@Controller('exchange-rates')
@ApiBearerAuth()
@ApiTags('Exchange Rates')
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get()
  findAll() {
    return this.exchangeRatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.exchangeRatesService.findOne(id);
  }
}
