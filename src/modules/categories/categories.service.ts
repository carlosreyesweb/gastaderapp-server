import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryNotFoundException } from './exceptions/category-not-found.exception';

@Injectable()
export class CategoriesService {
  private readonly categories;

  constructor(private readonly prismaService: PrismaService) {
    this.categories = this.prismaService.category;
  }

  async create(userId: number, dto: CreateCategoryDto) {
    const { name, description, color } = dto;

    const category = await this.categories.create({
      data: {
        name,
        description,
        color,
        user: { connect: { id: userId } },
      },
    });

    return new CategoryEntity(category);
  }

  async findAll(userId: number) {
    const categories = await this.categories.findMany({
      where: { userId },
    });

    return categories.map((category) => new CategoryEntity(category));
  }

  async findOne(id: number) {
    const category = await this.categories.findUnique({
      where: { id },
      include: { transactions: true },
    });
    if (!category) throw new CategoryNotFoundException();

    return new CategoryEntity(category);
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const updated = await this.categories.update({
      where: { id },
      data: dto,
      include: { transactions: true },
    });

    return new CategoryEntity(updated);
  }

  async remove(id: number) {
    await this.categories.delete({ where: { id } });
  }
}
