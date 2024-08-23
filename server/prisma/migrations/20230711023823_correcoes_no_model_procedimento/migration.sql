/*
  Warnings:

  - You are about to drop the column `profissionalId` on the `Procedimento` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Procedimento" DROP CONSTRAINT "Procedimento_profissionalId_fkey";

-- AlterTable
ALTER TABLE "Procedimento" DROP COLUMN "profissionalId";
