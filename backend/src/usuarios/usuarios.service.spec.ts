import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService, CreateUsuarioDto } from './usuarios.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  usuarios: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  personalMedico: {
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  recepcionistas: {
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  administradores: {
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  afiliados: {
    deleteMany: jest.fn(),
  },
};

describe('UsuariosService', () => {
  let service: UsuariosService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    prisma = module.get(PrismaService) as unknown as typeof mockPrismaService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUsuario', () => {
    const createDto: CreateUsuarioDto = {
      nombre: 'John',
      apellido: 'Doe',
      telefono: '123456789',
      fecha_nacimiento: new Date(),
      correo: 'john@example.com',
      nombre_usuario: 'johndoe',
      password: 'password123',
      tipo_usuario: 'medico',
    };

    it('should create a user and personalMedico entry if type is medico', async () => {
      const mockUser = { id_usuario: 1, ...createDto };
      (prisma.usuarios.create as jest.Mock).mockResolvedValue(mockUser);
      (prisma.personalMedico.create as jest.Mock).mockResolvedValue({});

      const result = await service.createUsuario(createDto);

      expect(prisma.usuarios.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          nombre: createDto.nombre,
          tipo_usuario: 'medico',
        }),
      });
      expect(prisma.personalMedico.create).toHaveBeenCalledWith({
        data: { id_medico: mockUser.id_usuario },
      });
      expect(result).toEqual(mockUser);
    });

    it('should create a user and recepcionistas entry if type is recepcionista', async () => {
      const dto = { ...createDto, tipo_usuario: 'recepcionista' as const };
      const mockUser = { id_usuario: 2, ...dto };
      (prisma.usuarios.create as jest.Mock).mockResolvedValue(mockUser);
      (prisma.recepcionistas.create as jest.Mock).mockResolvedValue({});

      await service.createUsuario(dto);

      expect(prisma.recepcionistas.create).toHaveBeenCalledWith({
        data: { id_recepcionista: mockUser.id_usuario },
      });
    });

    it('should create a user and administradores entry if type is administrador', async () => {
      const dto = { ...createDto, tipo_usuario: 'administrador' as const };
      const mockUser = { id_usuario: 3, ...dto };
      (prisma.usuarios.create as jest.Mock).mockResolvedValue(mockUser);
      (prisma.administradores.create as jest.Mock).mockResolvedValue({});

      await service.createUsuario(dto);

      expect(prisma.administradores.create).toHaveBeenCalledWith({
        data: { id_administrador: mockUser.id_usuario },
      });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id_usuario: 1, nombre: 'User 1' }];
      (prisma.usuarios.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(prisma.usuarios.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const mockUser = { id_usuario: 1, nombre: 'User 1' };
      (prisma.usuarios.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(prisma.usuarios.findUnique).toHaveBeenCalledWith({
        where: { id_usuario: 1 },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateDto: CreateUsuarioDto = {
        nombre: 'John Updated',
        apellido: 'Doe',
        telefono: '123456789',
        fecha_nacimiento: new Date(),
        correo: 'john@example.com',
        nombre_usuario: 'johndoe',
        password: 'password123',
        tipo_usuario: 'medico',
      };
      const mockUser = { id_usuario: 1, ...updateDto };
      (prisma.usuarios.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.update(1, updateDto);

      expect(prisma.usuarios.update).toHaveBeenCalledWith({
        where: { id_usuario: 1 },
        data: updateDto,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('delete', () => {
    it('should delete user and all related records', async () => {
      (prisma.usuarios.delete as jest.Mock).mockResolvedValue({ id_usuario: 1 });

      await service.delete(1);

      expect(prisma.personalMedico.deleteMany).toHaveBeenCalledWith({ where: { id_medico: 1 } });
      expect(prisma.recepcionistas.deleteMany).toHaveBeenCalledWith({ where: { id_recepcionista: 1 } });
      expect(prisma.administradores.deleteMany).toHaveBeenCalledWith({ where: { id_administrador: 1 } });
      expect(prisma.afiliados.deleteMany).toHaveBeenCalledWith({ where: { id_afiliado: 1 } });
      expect(prisma.usuarios.delete).toHaveBeenCalledWith({ where: { id_usuario: 1 } });
    });
  });
});
