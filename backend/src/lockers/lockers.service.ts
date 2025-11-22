import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LockersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.lockers.findMany({
      include: {
        Afiliado: {
          include: {
            Usuario: true,
          },
        },
      },
      orderBy: { id_locker: 'asc' },
    });
  }

  async findOne(id: number) {
    const locker = await this.prisma.lockers.findUnique({
      where: { id_locker: id },
      include: {
        Afiliado: {
          include: {
            Usuario: true, // Esto traerá los datos del usuario asociado al afiliado
          },
        },
      },
    });

    if (!locker) throw new NotFoundException('Locker no encontrado');
    return locker;
  }

  async assignLocker(
    id: number,
    id_afiliado: number,
    estado: 'disponible' | 'ocupado' | 'alquilado',
  ) {
    return this.prisma.lockers.update({
      where: { id_locker: id },
      data: {
        id_afiliado,
        estado,
      },
    });
  }

  async freeLocker(id: number) {
    return this.prisma.lockers.update({
      where: { id_locker: id },
      data: {
        id_afiliado: null,
        estado: 'disponible',
      },
    });
  }

  async updateStatus(
    id: number,
    estado: 'disponible' | 'ocupado' | 'alquilado',
  ) {
    return this.prisma.lockers.update({
      where: { id_locker: id },
      data: { estado },
    });
  }
}
