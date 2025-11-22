/*
  Warnings:

  - A unique constraint covering the columns `[documento]` on the table `Afiliados` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_locker]` on the table `Lockers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "EstadoLocker" ADD VALUE 'alquilado';

-- AlterTable
ALTER TABLE "Lockers" ALTER COLUMN "id_locker" DROP DEFAULT;
DROP SEQUENCE "Lockers_id_locker_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Afiliados_documento_key" ON "Afiliados"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "Lockers_id_locker_key" ON "Lockers"("id_locker");
