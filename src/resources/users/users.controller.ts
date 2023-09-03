import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { AdminGuard } from './guards/admin/admin.guard';
import { UserOwnershipGuard } from './guards/user-ownership/user-ownership.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AdminGuard)
  async findAll() {
    const users = await this.usersService.findAll();

    return users.map((user) => new UserEntity(user));
  }

  @Get(':userId')
  async findOne(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new UserNotFoundException();

    return new UserEntity(user);
  }

  @Patch(':userId')
  @UseGuards(UserOwnershipGuard)
  async update(@User() user: UserEntity, @Body() updateUserDto: UpdateUserDto) {
    const updated = await this.usersService.update(user.id, updateUserDto);

    return new UserEntity(updated);
  }

  @Delete(':userId')
  @UseGuards(UserOwnershipGuard)
  async remove(@User() user: UserEntity) {
    const deleted = await this.usersService.remove(user.id);

    return new UserEntity(deleted);
  }
}
