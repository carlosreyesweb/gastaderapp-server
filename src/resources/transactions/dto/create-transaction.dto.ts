import { TransactionType } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsString()
  reason: string;

  @IsInt()
  @IsPositive()
  amount: number;

  @IsInt()
  @IsPositive()
  accountId: number;

  @IsInt()
  @IsOptional()
  categoryId?: number;
}
