/*
  Warnings:

  - The primary key for the `Voter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Voter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_voterId_fkey";

-- DropIndex
DROP INDEX "Voter_document_key";

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "voterId" SET DATA TYPE TEXT,
ALTER COLUMN "candidateId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Voter_pkey" PRIMARY KEY ("document");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "Voter"("document") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Voter"("document") ON DELETE RESTRICT ON UPDATE CASCADE;
