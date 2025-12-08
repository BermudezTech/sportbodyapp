import {
  Controller,
  Patch,
  Body,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { QrCodeService } from './qr-code.service';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrService: QrCodeService) {}
  @Patch()
  getQRforUser(@Body() body: { correo: string }) {
    if (!body.correo) {
      throw new BadRequestException('Correo no proporcionado');
    }
    return this.qrService.getQRByMail(body.correo);
  }
  @Patch('validate')
  validateQR(@Body() body: { qr_code: string }) {
    if (!body.qr_code) {
      throw new BadRequestException('QR no proporcionado');
    }

    return this.qrService.validateQR(body.qr_code);
  }

  @Get('test')
  getTestQR() {
    return this.qrService.getQRByMail('jebermudez587@gmail.com');
  }
}
