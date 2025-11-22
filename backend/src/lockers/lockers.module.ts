import { Module } from '@nestjs/common';
import { LockersService } from './lockers.service';
import { LockersController } from './lockers.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LockersController],
  providers: [LockersService, PrismaService],
})
export class LockersModule {}
