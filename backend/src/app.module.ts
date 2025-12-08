import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AfiliadosModule } from './afiliados/afiliados.module';
import { LockersModule } from './lockers/lockers.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { QrCodeModule } from './qr-code/qr-code.module';

@Module({
  imports: [AfiliadosModule, LockersModule, UsuariosModule, AuthModule, QrCodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
