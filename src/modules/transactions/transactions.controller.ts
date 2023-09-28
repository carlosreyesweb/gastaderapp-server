import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserId } from '../users/decorators/user-id.decorator';
import { Transaction } from './decorators/transaction.decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';
import { CreateTransactionGuard } from './guards/create-transaction/create-transaction.guard';
import { TransactionOwnershipGuard } from './guards/transaction-ownership/transaction-ownership.guard';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@ApiBearerAuth()
@ApiTags('Transacciones')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(CreateTransactionGuard)
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(dto);
  }

  @Get()
  findAll(@UserId() userId: string) {
    return this.transactionsService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(TransactionOwnershipGuard)
  findOne(@Transaction() transaction: TransactionEntity) {
    return transaction;
  }

  @Patch(':id')
  @UseGuards(TransactionOwnershipGuard)
  update(@Transaction('id') id: string, @Body() dto: UpdateTransactionDto) {
    return this.transactionsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(TransactionOwnershipGuard)
  remove(@Transaction('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
