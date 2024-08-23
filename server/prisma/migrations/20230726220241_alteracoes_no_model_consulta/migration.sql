/*
  Warnings:

  - Added the required column `tipo_de_pagamento` to the `Consulta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consulta" ADD COLUMN     "tipo_de_pagamento" TEXT NOT NULL;
