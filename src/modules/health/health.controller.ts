import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
@ApiTags('Health')
@SkipAuth()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => ({ api: { status: 'up' } }),
      () => this.prismaHealth.pingCheck('prisma', this.prisma),
    ]);
  }
}
