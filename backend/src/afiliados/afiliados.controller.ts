import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Put,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AfiliadosService } from './afiliados.service';
import { CreateAfiliadoDto } from './dto/create-afiliado.dto';
import { UpdateAfiliadoDto } from './dto/update-afiliado.dto';

@Controller('afiliados')
export class AfiliadosController {
  constructor(private readonly afiliadosService: AfiliadosService) {}

  @Get()
  findAll() {
    return this.afiliadosService.findAll();
  }

  @Patch('profile')
  findOne(@Body() body: { correo: string }) {
    return this.afiliadosService.findOne(body.correo);
  }

  @Post()
  create(@Body() createAfiliadoDto: CreateAfiliadoDto) {
    if (!createAfiliadoDto.nombre) {
      throw new BadRequestException("El 'nombre' es obligatorio");
    }
    if (!createAfiliadoDto.apellido) {
      throw new BadRequestException("El 'apellido' es obligatorio");
    }
    if (!createAfiliadoDto.correo) {
      throw new BadRequestException("El 'correo' es obligatorio");
    }
    if (!createAfiliadoDto.telefono) {
      throw new BadRequestException("El 'telefono' es obligatorio");
    }
    if (!createAfiliadoDto.fecha_nacimiento) {
      throw new BadRequestException("La 'fecha_nacimiento' es obligatoria");
    }
    if (!createAfiliadoDto.documento) {
      throw new BadRequestException("El 'documento' es obligatorio");
    }
    if (!createAfiliadoDto.contacto_emergencia) {
      throw new BadRequestException("El 'contacto_emergencia' es obligatorio");
    }
    return this.afiliadosService.create(createAfiliadoDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAfiliadoDto: UpdateAfiliadoDto,
  ) {
    return this.afiliadosService.update(parseInt(id), updateAfiliadoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.afiliadosService.delete(parseInt(id));
  }
}
