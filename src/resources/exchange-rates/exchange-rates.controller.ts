import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { ExchangeRatesService } from './exchange-rates.service';

@Controller('exchange-rates')
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Post()
  create(@Body() createExchangeRateDto: CreateExchangeRateDto) {
    return this.exchangeRatesService.create(createExchangeRateDto);
  }

  @Get()
  findAll() {
    return this.exchangeRatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exchangeRatesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExchangeRateDto: UpdateExchangeRateDto,
  ) {
    return this.exchangeRatesService.update(+id, updateExchangeRateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exchangeRatesService.remove(+id);
  }
}