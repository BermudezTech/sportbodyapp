/*
  Warnings:

  - A unique constraint covering the columns `[qr_code]` on the table `Afiliados` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Afiliados_qr_code_key" ON "Afiliados"("qr_code");
