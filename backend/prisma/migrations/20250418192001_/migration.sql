/*
  Warnings:

  - You are about to drop the column `dni` on the `Voter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document]` on the table `Voter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lastName` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Voter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `Voter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Voter` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Voter_dni_key";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Voter" DROP COLUMN "dni",
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "document" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Voter_document_key" ON "Voter"("document");
