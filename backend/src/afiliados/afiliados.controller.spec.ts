import {Test, TestingModule} from '@nestjs/testing';
import {AfiliadosController} from './afiliados.controller';
import {AfiliadosService} from './afiliados.service';

describe('AfiliadosController', () => {
  let controller: AfiliadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AfiliadosController],
      providers: [
        {
          provide: AfiliadosService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AfiliadosController>(AfiliadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
