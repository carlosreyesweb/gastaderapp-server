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
import { ApiTags } from '@nestjs/swagger';
import { Session } from '../sessions/decorators/session.decorator';
import { SessionEntity } from '../sessions/entities/session.entity';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountOwnershipGuard } from './guards/account-ownership/account-ownership.guard';

@Controller('accounts')
@ApiTags('Cuentas')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Session() session: SessionEntity, @Body() dto: CreateAccountDto) {
    return this.accountsService.create(session.userId, dto);
  }

  @Get()
  findAll(@Session() session: SessionEntity) {
    return this.accountsService.findAll(session.userId);
  }

  @Get(':id')
  @UseGuards(AccountOwnershipGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AccountOwnershipGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAccountDto) {
    return this.accountsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AccountOwnershipGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.remove(id);
  }
}
