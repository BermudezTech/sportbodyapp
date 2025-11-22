import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AfiliadosModule } from './afiliados/afiliados.module';

@Module({
  imports: [AfiliadosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
