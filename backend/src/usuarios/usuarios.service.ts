import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateUsuarioDto {
  nombre: string;
  apellido: string;
  telefono: string;
  fecha_nacimiento: Date;
  correo: string;
  nombre_usuario: string;
  password: string;
  tipo_usuario: 'afiliado' | 'recepcionista' | 'medico' | 'administrador';
}

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async createUsuario(data: CreateUsuarioDto) {
    const { tipo_usuario, ...usuarioData } = data;

    const createdUsuario = await this.prisma.usuarios.create({
      data: {
        ...usuarioData,
        tipo_usuario,
      },
    });

    // Dependiendo del tipo de usuario, crear registro en tabla correspondiente
    if (tipo_usuario === 'medico') {
      await this.prisma.personalMedico.create({
        data: { id_medico: createdUsuario.id_usuario },
      });
    } else if (tipo_usuario === 'recepcionista') {
      await this.prisma.recepcionistas.create({
        data: { id_recepcionista: createdUsuario.id_usuario },
      });
    } else if (tipo_usuario === 'administrador') {
      await this.prisma.administradores.create({
        data: { id_administrador: createdUsuario.id_usuario },
      });
    }

    return createdUsuario;
  }

  async findAll() {
    return this.prisma.usuarios.findMany();
  }

  async findOne(id: number) {
    return this.prisma.usuarios.findUnique({
      where: { id_usuario: id },
    });
  }

  async update(id: number, data: CreateUsuarioDto) {
    return this.prisma.usuarios.update({
      where: { id_usuario: id },
      data,
    });
  }

  // First delete all relations
  async delete(id: number) {
    await this.prisma.personalMedico.deleteMany({
      where: { id_medico: id },
    });
    await this.prisma.recepcionistas.deleteMany({
      where: { id_recepcionista: id },
    });
    await this.prisma.administradores.deleteMany({
      where: { id_administrador: id },
    });
    await this.prisma.afiliados.deleteMany({
      where: { id_afiliado: id },
    });
    return this.prisma.usuarios.delete({
      where: { id_usuario: id },
    });
  }
}
