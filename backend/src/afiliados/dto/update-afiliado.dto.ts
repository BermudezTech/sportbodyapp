export class UpdateAfiliadoDto {
  // Campos del afiliado
  documento?: string;
  fecha_afiliacion?: Date;
  fecha_vencimiento?: Date;
  qr_code?: string;
  fecha_nacimiento?: Date;
  tipo_membresia?: string;
  contacto_emergencia?: string;

  // Campos del usuario
  nombre?: string;
  apellido?: string;
  telefono?: string;
  correo?: string;
}
