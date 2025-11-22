import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
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

  @Patch(':id/free')
  free(@Param('id') id: string) {
    return this.lockersService.freeLocker(Number(id));
  }
}
