import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { AdminGuard } from './guards/admin/admin.guard';
import { UserOwnershipGuard } from './guards/user-ownership/user-ownership.guard';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(UserOwnershipGuard)
  findOne(@User() user: UserEntity) {
    return new UserEntity(user);
  }

  @Patch(':id')
  @UseGuards(UserOwnershipGuard)
  update(@User() user: UserEntity, @Body() dto: UpdateUserDto) {
    return this.usersService.update(user.id, dto);
  }

  @Delete(':id')
  @UseGuards(UserOwnershipGuard)
  remove(@User() user: UserEntity) {
    return this.usersService.remove(user.id);
  }
}
