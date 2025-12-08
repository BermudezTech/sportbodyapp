import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QrCodeService {
  constructor(private prisma: PrismaService) {}

  async getQRByMail(mail: string) {
    const afiliado = await this.prisma.afiliados.findFirst({
      where: {
        Usuario: {
          correo: mail,
        },
      },
      include: {
        Usuario: true,
      },
    });
    if (!afiliado) {
      throw new NotFoundException('QR para el usuario no encontrado');
    }
    const qr_code = afiliado.qr_code;
    return { qr_code };
  }

  async validateQR(qr_code: string) {
    const afiliado = await this.prisma.afiliados.findFirst({
      where: {
        qr_code,
      },
      include: {
        Usuario: true,
      },
    });
    if (!afiliado) throw new NotFoundException('QR no válido');
    await this.prisma.afiliados.update({
      where: {
        qr_code,
      },
      data: {
        qr_code: crypto.randomUUID(),
      },
    });
    return afiliado;
  }
}
