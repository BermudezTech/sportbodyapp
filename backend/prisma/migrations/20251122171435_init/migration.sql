-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('afiliado', 'recepcionista', 'administrador', 'medico');

-- CreateEnum
CREATE TYPE "EstadoLocker" AS ENUM ('disponible', 'ocupado');

-- CreateEnum
CREATE TYPE "EstadoAcceso" AS ENUM ('autorizado', 'denegado');

-- CreateTable
CREATE TABLE "Usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" TEXT,
    "correo" TEXT,
    "nombre_usuario" TEXT NOT NULL,
    "password" TEXT,
    "tipo_usuario" "TipoUsuario",

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Afiliados" (
    "id_afiliado" INTEGER NOT NULL,
    "documento" TEXT,
    "fecha_afiliacion" TIMESTAMP(3),
    "fecha_vencimiento" TIMESTAMP(3),
    "qr_code" TEXT,

    CONSTRAINT "Afiliados_pkey" PRIMARY KEY ("id_afiliado")
);

-- CreateTable
CREATE TABLE "PersonalMedico" (
    "id_medico" INTEGER NOT NULL,

    CONSTRAINT "PersonalMedico_pkey" PRIMARY KEY ("id_medico")
);

-- CreateTable
CREATE TABLE "Recepcionistas" (
    "id_recepcionista" INTEGER NOT NULL,

    CONSTRAINT "Recepcionistas_pkey" PRIMARY KEY ("id_recepcionista")
);

-- CreateTable
CREATE TABLE "Administradores" (
    "id_administrador" INTEGER NOT NULL,

    CONSTRAINT "Administradores_pkey" PRIMARY KEY ("id_administrador")
);

-- CreateTable
CREATE TABLE "Lockers" (
    "id_locker" SERIAL NOT NULL,
    "estado" "EstadoLocker" NOT NULL DEFAULT 'disponible',
    "id_afiliado" INTEGER,

    CONSTRAINT "Lockers_pkey" PRIMARY KEY ("id_locker")
);

-- CreateTable
CREATE TABLE "Valoraciones" (
    "id_valoracion" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3),
    "peso" DECIMAL(65,30),
    "imc" DECIMAL(65,30),
    "observaciones" TEXT,
    "id_afiliado" INTEGER NOT NULL,
    "id_medico" INTEGER NOT NULL,

    CONSTRAINT "Valoraciones_pkey" PRIMARY KEY ("id_valoracion")
);

-- CreateTable
CREATE TABLE "Rutinas" (
    "id_rutina" SERIAL NOT NULL,
    "nombre" TEXT,
    "descripcion" TEXT,
    "duracion_semanas" INTEGER,
    "ejercicios" TEXT,
    "id_afiliado" INTEGER NOT NULL,

    CONSTRAINT "Rutinas_pkey" PRIMARY KEY ("id_rutina")
);

-- CreateTable
CREATE TABLE "Accesos" (
    "id_acceso" SERIAL NOT NULL,
    "fecha_hora" TIMESTAMP(3),
    "estado" "EstadoAcceso" NOT NULL,
    "id_afiliado" INTEGER NOT NULL,

    CONSTRAINT "Accesos_pkey" PRIMARY KEY ("id_acceso")
);

-- CreateTable
CREATE TABLE "Facturas" (
    "id_factura" SERIAL NOT NULL,
    "fecha_emision" TIMESTAMP(3),
    "monto" DECIMAL(65,30),
    "id_afiliado" INTEGER NOT NULL,

    CONSTRAINT "Facturas_pkey" PRIMARY KEY ("id_factura")
);

-- AddForeignKey
ALTER TABLE "Afiliados" ADD CONSTRAINT "Afiliados_id_afiliado_fkey" FOREIGN KEY ("id_afiliado") REFERENCES "Usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalMedico" ADD CONSTRAINT "PersonalMedico_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "Usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recepcionistas" ADD CONSTRAINT "Recepcionistas_id_recepcionista_fkey" FOREIGN KEY ("id_recepcionista") REFERENCES "Usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administradores" ADD CONSTRAINT "Administradores_id_administrador_fkey" FOREIGN KEY ("id_administrador") REFERENCES "Usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lockers" ADD CONSTRAINT "Lockers_id_afiliado_fkey" FOREIGN KEY ("id_afiliado") REFERENCES "Afiliados"("id_afiliado") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Valoraciones" ADD CONSTRAINT "Valoraciones_id_afiliado_fkey" FOREIGN KEY ("id_afiliado") REFERENCES "Afiliados"("id_afiliado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Valoraciones" ADD CONSTRAINT "Valoraciones_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "PersonalMedico"("id_medico") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rutinas" ADD CONSTRAINT "Rutinas_id_afiliado_fkey" FOREIGN KEY ("id_afiliado") REFERENCES "Afiliados"("id_afiliado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accesos" ADD CONSTRAINT "Accesos_id_afiliado_fkey" FOREIGN KEY ("id_afiliado") REFERENCES "Afiliados"("id_afiliado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facturas" ADD CONSTRAINT "Facturas_id_afiliado_fkey" FOREIGN KEY ("id_afiliado") REFERENCES "Afiliados"("id_afiliado") ON DELETE RESTRICT ON UPDATE CASCADE;
