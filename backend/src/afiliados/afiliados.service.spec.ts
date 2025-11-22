import { Test, TestingModule } from '@nestjs/testing';
import { AfiliadosService } from './afiliados.service';

describe('AfiliadosService', () => {
  let service: AfiliadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AfiliadosService],
    }).compile();

    service = module.get<AfiliadosService>(AfiliadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
