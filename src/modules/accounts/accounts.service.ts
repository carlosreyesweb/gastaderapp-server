import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { merge } from 'lodash';
import { CurrenciesService } from '../currencies/currencies.service';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsService } from '../transactions/transactions.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';
import { AccountAlreadyExistsException } from './exceptions/account-already-exists.exception';
import { AccountNotFoundException } from './exceptions/account-not-found.exception';

@Injectable()
export class AccountsService {
  private readonly accounts;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly currenciesService: CurrenciesService,
    @Inject(forwardRef(() => TransactionsService))
    private readonly transactionsService: TransactionsService,
  ) {
    this.accounts = this.prismaService.account;
  }

  async create(userId: string, dto: CreateAccountDto) {
    const { currencyId, name, accountNumber, balance, color } = dto;
    const existent = await this.accounts.findUnique({
      where: {
        name,
      },
    });
    if (existent) throw new AccountAlreadyExistsException();
    const currency = await this.currenciesService.findOne(currencyId);
    const account = await this.accounts.create({
      data: {
        name,
        accountNumber,
        color,
        currency: { connect: { id: currency.id } },
        user: { connect: { id: userId } },
      },
      include: {
        currency: true,
      },
    });
    if (balance) {
      const initialTransaction = await this.transactionsService.create({
        type: TransactionType.INCOME,
        amount: balance,
        accountId: account.id,
        reason: 'Saldo inicial',
      });
      const accountWithInitialBalance = merge(account, {
        balance: initialTransaction.amount,
      });

      return new AccountEntity(accountWithInitialBalance);
    }

    return new AccountEntity(account);
  }

  async findAll(userId: string) {
    const accounts = await this.accounts.findMany({
      where: { userId },
      include: { currency: true },
    });
    const balances = await this.transactionsService.balances(
      accounts.map((acc) => acc.id),
    );
    const accountsWithBalance = accounts.map((account) =>
      merge(account, { balance: balances[account.id] }),
    );

    return accountsWithBalance.map((account) => new AccountEntity(account));
  }

  async findOne(id: string) {
    const account = await this.accounts.findUnique({
      where: { id },
      include: { currency: true, transactions: true },
    });
    if (!account) throw new AccountNotFoundException();
    const balance = await this.transactionsService.balanceOf(account.id);
    const accountWithBalance = merge(account, { balance });

    return new AccountEntity(accountWithBalance);
  }

  async update(id: string, dto: UpdateAccountDto) {
    const { balance: newBalance, ...data } = dto;
    if (typeof newBalance !== 'undefined') {
      const currentBalance = await this.transactionsService.balanceOf(id);
      if (newBalance !== currentBalance) {
        await this.transactionsService.create({
          type:
            newBalance > currentBalance
              ? TransactionType.INCOME
              : TransactionType.OUTCOME,
          amount:
            newBalance > currentBalance
              ? newBalance - currentBalance
              : currentBalance - newBalance,
          accountId: id,
          reason:
            newBalance > currentBalance
              ? '(Ingreso sin justificar)'
              : '(Retiro sin justificar)',
        });
      }
    }
    const updated = await this.accounts.update({
      where: { id },
      data,
      include: { currency: true, transactions: true },
    });
    const balance = await this.transactionsService.balanceOf(id);
    const updatedAccountWithBalance = merge(updated, {
      balance,
    });

    return new AccountEntity(updatedAccountWithBalance);
  }

  async remove(id: string) {
    await this.accounts.delete({ where: { id } });
  }
}
