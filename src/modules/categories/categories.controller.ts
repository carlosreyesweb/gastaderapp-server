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
import { CategoriesService } from './categories.service';
import { Category } from './decorators/category.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryOwnershipGuard } from './guards/category-ownership/category-ownership.guard';

@Controller('categories')
@ApiBearerAuth()
@ApiTags('Categorías')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@UserId() userId: string, @Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(userId, dto);
  }

  @Get()
  findAll(@UserId() userId: string) {
    return this.categoriesService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(CategoryOwnershipGuard)
  findOne(@Category() category: CategoryEntity) {
    return category;
  }

  @Patch(':id')
  @UseGuards(CategoryOwnershipGuard)
  update(@Category('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(CategoryOwnershipGuard)
  remove(@Category('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
