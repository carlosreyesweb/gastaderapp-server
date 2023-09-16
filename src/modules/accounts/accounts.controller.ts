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
import { AccountsService } from './accounts.service';
import { Account } from './decorators/account.decorator';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';
import { AccountOwnershipGuard } from './guards/account-ownership/account-ownership.guard';

@Controller('accounts')
@ApiBearerAuth()
@ApiTags('Cuentas')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@UserId() userId: number, @Body() dto: CreateAccountDto) {
    return this.accountsService.create(userId, dto);
  }

  @Get()
  findAll(@UserId() userId: number) {
    return this.accountsService.findAll(userId);
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
