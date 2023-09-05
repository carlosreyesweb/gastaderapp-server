import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SessionsRepository } from './sessions.repository';
import { SessionsService } from './sessions.service';

@Module({
  imports: [PrismaModule],
  providers: [SessionsRepository, SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
