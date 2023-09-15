import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
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

  async create(userId: number, dto: CreateAccountDto) {
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
        balance,
        color,
        currency: { connect: { id: currency.id } },
        user: { connect: { id: userId } },
      },
      include: {
        currency: true,
      },
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
    const accounts = await this.accounts.findMany({
      where: { userId },
      include: { currency: true },
    });

    return accounts.map((account) => new AccountEntity(account));
  }

  async findOne(id: number) {
    const account = await this.accounts.findUnique({
      where: { id },
      include: { currency: true, transactions: true },
    });
    if (!account) throw new AccountNotFoundException();

    return new AccountEntity(account);
  }

  async update(id: number, dto: UpdateAccountDto) {
    const old = await this.accounts.findUnique({ where: { id } });
    if (!old) throw new AccountNotFoundException();

    const updated = await this.accounts.update({
      where: { id: old.id },
      data: dto,
      include: { currency: true, transactions: true },
    });

    if (dto.balance) {
      await this.transactionsService.create({
        type:
          old.balance > dto.balance
            ? TransactionType.OUTCOME
            : TransactionType.INCOME,
        amount: dto.balance,
        accountId: updated.id,
        reason:
          old.balance > dto.balance
            ? '(Retiro sin justificar)'
            : '(Ingreso sin justificar)',
      });
    }

    return new AccountEntity(updated);
  }

  async remove(id: number) {
    await this.accounts.delete({ where: { id } });
  }
}
