import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
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
  @UseGuards(UserOwnershipGuard)
  findOne(@User() user: UserEntity) {
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
