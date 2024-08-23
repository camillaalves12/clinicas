/*
  Warnings:

  - You are about to drop the column `tipoId` on the `Procedimento` table. All the data in the column will be lost.
  - Added the required column `tipo_de_procedimentoId` to the `Procedimento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Procedimento" DROP CONSTRAINT "Procedimento_tipoId_fkey";

-- AlterTable
ALTER TABLE "Procedimento" DROP COLUMN "tipoId",
ADD COLUMN     "tipo_de_procedimentoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" SERIAL NOT NULL,
    "data_de_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_da_consulta" TEXT NOT NULL,
    "hora_da_consulta" TEXT NOT NULL,
    "valor_da_consulta" INTEGER NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    "procedimentoId" INTEGER NOT NULL,
    "clinicaId" INTEGER NOT NULL,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_procedimentoId_fkey" FOREIGN KEY ("procedimentoId") REFERENCES "Procedimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "Clinica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procedimento" ADD CONSTRAINT "Procedimento_tipo_de_procedimentoId_fkey" FOREIGN KEY ("tipo_de_procedimentoId") REFERENCES "Tipo_de_procedimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
