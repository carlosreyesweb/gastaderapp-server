import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TransactionType } from '@prisma/client';

import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { CurrenciesService } from '../currencies/currencies.service';
import { CurrencyNotFoundException } from '../currencies/exceptions/currency-not-found.exception';
import { TransactionsService } from '../transactions/transactions.service';
import { User } from '../users/decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { AccountsService } from './accounts.service';
import { Account } from './decorators/account.decorator';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';
import { AccountAlreadyExistsException } from './exceptions/account-already-exists.exception';
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
      currency: { connect: { id: currency.id } },
      user: { connect: { id: user.id } },
    });

    if (balance) {
      await this.transactionsService.create({
        type: TransactionType.INCOME,
        amount: balance,
        account: { connect: { id: account.id } },
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
  async findOne(@Account() account: AccountEntity) {
    return new AccountEntity(account);
  }

  @Patch(':accountId')
  @UseGuards(AccountOwnershipGuard)
  async update(
    @Account() account: AccountEntity,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    const updated = await this.accountsService.update(
      account.id,
      updateAccountDto,
    );

    return new AccountEntity(updated);
  }

  @Delete(':accountId')
  @UseGuards(AccountOwnershipGuard)
  async remove(@Account() account: AccountEntity) {
    const deleted = await this.accountsService.remove(account.id);

    return deleted;
  }
}
