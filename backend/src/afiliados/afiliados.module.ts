import { Module } from '@nestjs/common';
import { AfiliadosService } from './afiliados.service';
import { AfiliadosController } from './afiliados.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [AfiliadosService],
  controllers: [AfiliadosController],
  imports: [PrismaModule],
})
export class AfiliadosModule {}
