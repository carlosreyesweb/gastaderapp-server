import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { CurrenciesService } from '../currencies/currencies.service';
import { TransactionsService } from '../transactions/transactions.service';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';
import { AccountAlreadyExistsException } from './exceptions/account-already-exists.exception';
import { AccountNotFoundException } from './exceptions/account-not-found.exception';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly currenciesService: CurrenciesService,
    @Inject(forwardRef(() => TransactionsService))
    private readonly transactionsService: TransactionsService,
  ) {}

  async create(userId: number, dto: CreateAccountDto) {
    const { currencyId, name, accountNumber, balance, color } = dto;

    const existentAccount = await this.accountsRepository.findOne({
      name,
      accountNumber,
    });
    if (existentAccount) throw new AccountAlreadyExistsException();

    const currency = await this.currenciesService.findOne(currencyId);

    const account = await this.accountsRepository.create({
      name,
      accountNumber,
      balance,
      color,
      currency: { connect: { id: currency.id } },
      user: { connect: { id: userId } },
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

  async findAll(userId: number) {
    const accounts = await this.accountsRepository.findAll({ userId });

    return accounts.map((account) => new AccountEntity(account));
  }

  async findOne(id: number) {
    const account = await this.accountsRepository.findOne({ id });
    if (!account) throw new AccountNotFoundException();

    return new AccountEntity(account);
  }

  async update(id: number, dto: UpdateAccountDto) {
    const updated = await this.accountsRepository.update(id, dto);

    return new AccountEntity(updated);
  }

  async remove(accountId: number) {
    await this.accountsRepository.remove(accountId);
  }
}
