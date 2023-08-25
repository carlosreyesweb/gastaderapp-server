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
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new UserNotFoundException();

    return user;
  }

  @Patch(':userId')
  @UseGuards(UserOwnershipGuard)
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  @UseGuards(UserOwnershipGuard)
  remove(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.remove(userId);
  }
}
