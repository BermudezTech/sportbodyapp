/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Afiliados` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apellido` to the `Afiliados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Afiliados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Afiliados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_membresia` to the `Afiliados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Afiliados" ADD COLUMN     "apellido" TEXT NOT NULL,
ADD COLUMN     "contacto_emergencia" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fecha_nacimiento" TIMESTAMP(3),
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "telefono" TEXT,
ADD COLUMN     "tipo_membresia" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Afiliados_email_key" ON "Afiliados"("email");
