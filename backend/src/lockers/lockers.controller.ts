import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { LockersService } from './lockers.service';

@Controller('lockers')
export class LockersController {
  constructor(private readonly lockersService: LockersService) {}

  @Get()
  findAll() {
    return this.lockersService.findAll();
  }

  @Patch(':id/assign')
  assign(
    @Param('id') id: string,
    @Body()
    body: {
      id_afiliado: number;
      estado: 'disponible' | 'ocupado' | 'alquilado';
    },
  ) {
    return this.lockersService.assignLocker(
      Number(id),
      Number(body.id_afiliado),
      body.estado,
    );
  }

  @Patch('getbymail')
  getLockerByMail(@Body() body: { correo: string }) {
    if (!body.correo) throw new BadRequestException('Correo no enviado');
    return this.lockersService.getLockerByMail(body.correo);
  }

  @Patch(':id/free')
  free(@Param('id') id: string) {
    return this.lockersService.freeLocker(Number(id));
  }
}
