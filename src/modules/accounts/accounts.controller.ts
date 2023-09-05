import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { AccountsService } from './accounts.service';
import { Account } from './decorators/account.decorator';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';
import { AccountOwnershipGuard } from './guards/account-ownership/account-ownership.guard';

@Controller('accounts')
@ApiTags('Cuentas')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@User() user: UserEntity, @Body() dto: CreateAccountDto) {
    return this.accountsService.create(user.id, dto);
  }

  @Get()
  findAll(@User() user: UserEntity) {
    return this.accountsService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(AccountOwnershipGuard)
  findOne(@Account() account: AccountEntity) {
    return account;
  }

  @Patch(':id')
  @UseGuards(AccountOwnershipGuard)
  update(@Account() account: AccountEntity, @Body() dto: UpdateAccountDto) {
    return this.accountsService.update(account.id, dto);
  }

  @Delete(':id')
  @UseGuards(AccountOwnershipGuard)
  remove(@Account() account: AccountEntity) {
    return this.accountsService.remove(account.id);
  }
}
