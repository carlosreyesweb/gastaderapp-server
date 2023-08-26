import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { CurrenciesService } from '../currencies/currencies.service';
import { CurrencyNotFoundException } from '../currencies/exceptions/currency-not-found.exception';
import { TransactionsService } from '../transactions/transactions.service';
import { UserEntity } from '../users/entities/user.entity';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';
import { AccountAlreadyExistsException } from './exceptions/account-already-exists.exception';
import { AccountNotFoundException } from './exceptions/account-not-found.exception';
import { AccountOwnershipGuard } from './guards/account-ownership/account-ownership.guard';

@Controller('accounts')
@UseGuards(AuthGuard)
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly currenciesService: CurrenciesService,
    private readonly transactionsService: TransactionsService,
  ) {}

  @Post()
  async create(
    @User() user: UserEntity,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    const { currencyId, name, accountNumber, balance, color } =
      createAccountDto;

    const existentAccount = await this.accountsService.findOneBy({
      name,
      accountNumber,
    });
    if (existentAccount) throw new AccountAlreadyExistsException();

    const currency = await this.currenciesService.findOne(currencyId);
    if (!currency) throw new CurrencyNotFoundException();

    const account = await this.accountsService.create({
      name,
      accountNumber,
      balance,
      color,
      currencyId: currency.id,
      userId: user.id,
    });

    if (balance) {
      await this.transactionsService.create({
        type: TransactionType.INCOME,
        amount: balance,
        accountId: account.id,
        reason: 'Saldo inicial',
      });
    }

    return new AccountEntity(account);
  }

  @Get()
  async findAll(@User() user: UserEntity) {
    const accounts = await this.accountsService.findAll(user.id);

    return accounts.map((account) => new AccountEntity(account));
  }

  @Get(':accountId')
  @UseGuards(AccountOwnershipGuard)
  async findOne(@Param('accountId', ParseIntPipe) accountId: number) {
    const account = await this.accountsService.findOne(accountId);
    if (!account) throw new AccountNotFoundException();

    return new AccountEntity(account);
  }

  @Patch(':accountId')
  @UseGuards(AccountOwnershipGuard)
  async update(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    const updated = await this.accountsService.update(
      accountId,
      updateAccountDto,
    );

    return new AccountEntity(updated);
  }

  @Delete(':accountId')
  @UseGuards(AccountOwnershipGuard)
  async remove(@Param('accountId', ParseIntPipe) accountId: number) {
    const deleted = await this.accountsService.remove(accountId);

    return deleted;
  }
}
