import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAfiliadoDto } from './dto/create-afiliado.dto';
import { UpdateAfiliadoDto } from './dto/update-afiliado.dto';

@Injectable()
export class AfiliadosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    // include user
    return this.prisma.afiliados.findMany({
      include: {
        Usuario: true,
      },
    });
  }

  async findOne(correo: string) {
    const afiliado = await this.prisma.afiliados.findFirst({
      where: {
        Usuario: {
          correo,
        },
      },
      include: {
        Usuario: true,
      },
    });
    return afiliado;
  }

  create(data: CreateAfiliadoDto) {
    return this.prisma.afiliados.create({
      data: {
        documento: data.documento,
        fecha_afiliacion: new Date(),
        fecha_vencimiento: new Date(),
        qr_code: crypto.randomUUID(),
        contacto_emergencia: data.contacto_emergencia,
        tipo_membresia: 'mensual',
        Usuario: {
          create: {
            nombre: data.nombre,
            apellido: data.apellido,
            correo: data.correo,
            telefono: data.telefono,
            fecha_nacimiento: data.fecha_nacimiento,
            nombre_usuario: data.correo,
            password: null,
            tipo_usuario: 'afiliado',
          },
        },
      },
    });
  }

  // Update including Usuario
  async update(id: number, data: UpdateAfiliadoDto) {
    // Campos del Afiliado
    const afiliadoData: any = {
      documento: data.documento,
      fecha_afiliacion: data.fecha_afiliacion,
      fecha_vencimiento: data.fecha_vencimiento,
      qr_code: data.qr_code,
      fecha_nacimiento: data.fecha_nacimiento,
      tipo_membresia: data.tipo_membresia,
      contacto_emergencia: data.contacto_emergencia,
    };

    // Campos del Usuario
    const usuarioData: any = {
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      correo: data.correo,
    };

    // Filtrar undefined (si no vino en el body, no se actualiza)
    const cleanAfiliado = Object.fromEntries(
      Object.entries(afiliadoData).filter(([_, v]) => v !== undefined),
    );

    const cleanUsuario = Object.fromEntries(
      Object.entries(usuarioData).filter(([_, v]) => v !== undefined),
    );

    return this.prisma.afiliados.update({
      where: { id_afiliado: id },
      data: {
        ...cleanAfiliado,
        Usuario: Object.keys(cleanUsuario).length
          ? { update: cleanUsuario }
          : undefined,
      },
      include: { Usuario: true },
    });
  }

  async delete(id: number) {
    // 1. Obtener afiliado con su usuario
    const afiliado = await this.prisma.afiliados.findUnique({
      where: { id_afiliado: id },
      include: { Usuario: true },
    });

    if (!afiliado) {
      throw new Error('Afiliado no encontrado');
    }

    // 2. Eliminar el afiliado primero (por la FK)
    await this.prisma.afiliados.delete({
      where: { id_afiliado: id },
    });

    // 3. Eliminar el usuario relacionado
    await this.prisma.usuarios.delete({
      where: { id_usuario: afiliado.Usuario.id_usuario },
    });

    return { message: 'Afiliado y usuario eliminados correctamente' };
  }
}
