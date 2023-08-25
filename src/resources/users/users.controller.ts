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
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updated = await this.usersService.update(userId, updateUserDto);

    return new UserEntity(updated);
  }

  @Delete(':userId')
  @UseGuards(UserOwnershipGuard)
  async remove(@Param('userId', ParseIntPipe) userId: number) {
    const deleted = await this.usersService.remove(userId);

    return new UserEntity(deleted);
  }
}
