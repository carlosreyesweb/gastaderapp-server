import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  private readonly include: Prisma.CategoryInclude = {
    transactions: true,
  };

  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.CategoryCreateInput) {
    return this.prismaService.category.create({ data });
  }

  findAll() {
    return this.prismaService.category.findMany({ include: { user: true } });
  }

  findAllByUser(userId: number) {
    return this.prismaService.category.findMany({
      where: { userId },
    });
  }

  findOne(id: number) {
    return this.prismaService.category.findUnique({
      where: { id },
      include: this.include,
    });
  }

  update(id: number, data: Prisma.CategoryUpdateInput) {
    return this.prismaService.category.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  remove(id: number) {
    return this.prismaService.category.delete({
      where: { id },
    });
  }
}
