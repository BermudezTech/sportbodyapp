import {Test, TestingModule} from '@nestjs/testing';
import {AfiliadosService} from './afiliados.service';
import {PrismaService} from '../prisma/prisma.service';

describe('AfiliadosService', () => {
  let service: AfiliadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AfiliadosService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AfiliadosService>(AfiliadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
