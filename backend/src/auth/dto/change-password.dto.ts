// src/auth/dto/change-password.dto.ts

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  @IsNotEmpty()
  correo: string; // Para identificar al usuario

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'La nueva contraseña debe tener al menos 8 caracteres',
  })
  newPassword: string;

  // Opcional, pero recomendado para validación en el cliente:
  @IsString()
  @IsNotEmpty()
  confirmNewPassword: string;
}
