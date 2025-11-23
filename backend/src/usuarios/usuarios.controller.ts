import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  Delete,
  Put,
} from '@nestjs/common';
import { UsuariosService, type CreateUsuarioDto } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() data: CreateUsuarioDto) {
    if (!data.nombre) {
      throw new BadRequestException('El nombre es obligatorio');
    }
    if (!data.apellido) {
      throw new BadRequestException('El apellido es obligatorio');
    }
    if (!data.telefono) {
      throw new BadRequestException('El telefono es obligatorio');
    }
    if (!data.fecha_nacimiento) {
      throw new BadRequestException('La fecha de nacimiento es obligatoria');
    }
    if (!data.correo) {
      throw new BadRequestException('El correo es obligatorio');
    }
    if (!data.nombre_usuario) {
      throw new BadRequestException('El nombre de usuario es obligatorio');
    }
    if (!data.password) {
      throw new BadRequestException('La contraseña es obligatoria');
    }
    return this.usuariosService.createUsuario(data);
  }

  @Get()
  async findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateUsuarioDto) {
    return this.usuariosService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usuariosService.delete(+id);
  }
}
