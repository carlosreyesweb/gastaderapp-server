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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryOwnershipGuard } from './guards/category-ownership/category-ownership.guard';

@Controller('categories')
@ApiTags('Categorías')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Session() session: SessionEntity, @Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(session.userId, dto);
  }

  @Get()
  findAll(@Session() session: SessionEntity) {
    return this.categoriesService.findAll(session.userId);
  }

  @Get(':id')
  @UseGuards(CategoryOwnershipGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(CategoryOwnershipGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(CategoryOwnershipGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
