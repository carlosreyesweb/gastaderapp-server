import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Session } from '../sessions/decorators/session.decorator';
import { SessionEntity } from '../sessions/entities/session.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findOne(@Session() session: SessionEntity) {
    return this.usersService.findOne(session.userId);
  }

  @Patch('me')
  update(@Session() session: SessionEntity, @Body() dto: UpdateUserDto) {
    return this.usersService.update(session.userId, dto);
  }

  @Delete('me')
  remove(@Session() session: SessionEntity) {
    return this.usersService.remove(session.userId);
  }
}
