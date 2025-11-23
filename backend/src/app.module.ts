import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AfiliadosModule } from './afiliados/afiliados.module';
import { LockersModule } from './lockers/lockers.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [AfiliadosModule, LockersModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
