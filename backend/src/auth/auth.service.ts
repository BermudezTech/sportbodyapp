// src/auth/auth.service.ts

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'; // Importamos bcrypt

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
    // 1. Buscar al usuario por correo
    const user = await this.prisma.usuarios.findUnique({
      where: {
        correo: loginDto.correo,
      },
    });

    // Si el usuario no existe, lanzar excepción
    if (!user) {
      throw new ForbiddenException('Usuario o contraseña incorrectos');
    }

    // 2. Lógica del Primer Inicio de Sesión (Contraseña vacía o nula)
    if (user.password === null || user.password === undefined) {
      // Si el campo 'password' está vacío/nulo, se permite la entrada temporal si el correo es la contraseña
      if (loginDto.correo === loginDto.password) {
        return {
          status: 200,
          message: 'passwordChangeRequired', // Indica al frontend que debe cambiar la contraseña
          user: {
            id: user.id_usuario,
            correo: user.correo,
            rol: user.tipo_usuario,
            nombre: `${user.nombre} ${user.apellido}`,
          }, // Devuelve datos básicos del usuario
        };
      } else {
        // Si no cumple la regla de "email como password", falla el login.
        throw new ForbiddenException('Usuario o contraseña incorrectos');
      }
    }

    // --- 3. Lógica de Login Normal (Contraseña hasheada existente) ---

    // Comparar la contraseña ingresada con el hash almacenado
    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (isMatch) {
      // Login normal exitoso
      return {
        status: 200,
        message: 'loginSuccessful',
        user: {
          id: user.id_usuario,
          correo: user.correo,
          rol: user.tipo_usuario,
          nombre: `${user.nombre} ${user.apellido}`,
        },
      };
    } else {
      // La contraseña no coincide
      throw new ForbiddenException('Usuario o contraseña incorrectos');
    }
  }

  async changeUserPassword(correo: string, newPassword: string) {
    const user = await this.prisma.usuarios.findUnique({
      where: { correo },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.usuarios.update({
      where: { correo },
      data: { password: hashedPassword },
    });
  }
}
