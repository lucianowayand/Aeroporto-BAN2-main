/*
  Warnings:

  - The primary key for the `modelo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `modelo_has_tecnico` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "aviao" DROP CONSTRAINT "mecanico_cods_fkey";

-- DropForeignKey
ALTER TABLE "controladoraereo" DROP CONSTRAINT "controlador_matricula_fkey";

-- DropForeignKey
ALTER TABLE "modelo_has_tecnico" DROP CONSTRAINT "codigo_modelo_fkey";

-- DropForeignKey
ALTER TABLE "modelo_has_tecnico" DROP CONSTRAINT "controlador_matricula_fkey";

-- DropForeignKey
ALTER TABLE "testa" DROP CONSTRAINT "numero_anac_fkey";

-- DropForeignKey
ALTER TABLE "testa" DROP CONSTRAINT "numero_aviao_fkey";

-- DropForeignKey
ALTER TABLE "testa" DROP CONSTRAINT "numero_tecnico_fkey";

-- AlterTable
ALTER TABLE "aviao" ALTER COLUMN "codigo_modelo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "controladoraereo" ALTER COLUMN "data_exame" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "empregado" ALTER COLUMN "endereco" SET NOT NULL,
ALTER COLUMN "endereco" SET DATA TYPE TEXT,
ALTER COLUMN "telefone" SET NOT NULL,
ALTER COLUMN "telefone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "modelo" DROP CONSTRAINT "modelo_pkey",
ALTER COLUMN "codigo" SET DATA TYPE TEXT,
ADD CONSTRAINT "modelo_pkey" PRIMARY KEY ("codigo");

-- AlterTable
ALTER TABLE "modelo_has_tecnico" DROP CONSTRAINT "modelo_has_tecnico_pkey",
ALTER COLUMN "codigo_modelo" SET DATA TYPE TEXT,
ADD CONSTRAINT "modelo_has_tecnico_pkey" PRIMARY KEY ("nro_matricula", "codigo_modelo");

-- AlterTable
ALTER TABLE "testa" ALTER COLUMN "data" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "tempo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "teste" ALTER COLUMN "nome" SET NOT NULL,
ALTER COLUMN "nome" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "aviao" ADD CONSTRAINT "mecanico_cods_fkey" FOREIGN KEY ("codigo_modelo") REFERENCES "modelo"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controladoraereo" ADD CONSTRAINT "controlador_matricula_fkey" FOREIGN KEY ("nro_matricula") REFERENCES "empregado"("nro_matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_has_tecnico" ADD CONSTRAINT "codigo_modelo_fkey" FOREIGN KEY ("codigo_modelo") REFERENCES "modelo"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_has_tecnico" ADD CONSTRAINT "controlador_matricula_fkey" FOREIGN KEY ("nro_matricula") REFERENCES "empregado"("nro_matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testa" ADD CONSTRAINT "numero_anac_fkey" FOREIGN KEY ("nro_anac") REFERENCES "teste"("nro_anac") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testa" ADD CONSTRAINT "numero_aviao_fkey" FOREIGN KEY ("num_reg") REFERENCES "aviao"("num_reg") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testa" ADD CONSTRAINT "numero_tecnico_fkey" FOREIGN KEY ("nro_tecnico") REFERENCES "empregado"("nro_matricula") ON DELETE RESTRICT ON UPDATE CASCADE;
