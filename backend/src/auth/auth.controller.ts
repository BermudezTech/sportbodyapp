import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);

    return result;
  }

  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    // 1. Opcionalmente, validar que las contraseñas nuevas coincidan
    if (
      changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword
    ) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    // 2. Delegar la lógica de actualización y hasheo al servicio
    await this.authService.changeUserPassword(
      changePasswordDto.correo,
      changePasswordDto.newPassword,
    );

    return {
      status: 200,
      message: 'Contraseña actualizada exitosamente. Por favor, inicie sesión.',
    };
  }
}
