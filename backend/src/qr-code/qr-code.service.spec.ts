import {Test, TestingModule} from '@nestjs/testing';
import {QrCodeService} from './qr-code.service';
import {PrismaService} from '../prisma/prisma.service';

describe('QrCodeService', () => {
  let service: QrCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QrCodeService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<QrCodeService>(QrCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
