import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { IsEnum, IsInt, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty()
  @IsString()
  reason: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  amount: number;

  @ApiProperty()
  @IsUUID()
  accountId: string;

  @ApiPropertyOptional()
  @IsUUID()
  categoryId?: string;
}
