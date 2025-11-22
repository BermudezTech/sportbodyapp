/*
  Warnings:

  - You are about to drop the column `apellido` on the `Afiliados` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Afiliados` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Afiliados` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `Afiliados` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Afiliados_email_key";

-- AlterTable
ALTER TABLE "Afiliados" DROP COLUMN "apellido",
DROP COLUMN "email",
DROP COLUMN "nombre",
DROP COLUMN "telefono";

-- AlterTable
ALTER TABLE "Usuarios" ADD COLUMN     "apellido" TEXT,
ADD COLUMN     "fecha_nacimiento" TIMESTAMP(3),
ADD COLUMN     "telefono" TEXT;
