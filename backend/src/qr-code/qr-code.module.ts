import { Module } from '@nestjs/common';
import { QrCodeController } from './qr-code.controller';
import { QrCodeService } from './qr-code.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [QrCodeController],
  providers: [QrCodeService, PrismaService],
})
export class QrCodeModule {}
