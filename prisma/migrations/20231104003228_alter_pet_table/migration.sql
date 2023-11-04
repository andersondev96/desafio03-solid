/*
  Warnings:

  - You are about to drop the column `energy` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `independence` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `wide_environment` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `pets` table. All the data in the column will be lost.
  - Added the required column `petAge` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petEnergyLevel` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petIndependenceLevel` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petSize` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petSpaceNeed` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('YOUNG', 'TEEN', 'ADULT');

-- CreateEnum
CREATE TYPE "PetEnergyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "PetIndependenceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PetSpaceNeed" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "city" TEXT;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "energy",
DROP COLUMN "independence",
DROP COLUMN "size",
DROP COLUMN "wide_environment",
DROP COLUMN "year",
ADD COLUMN     "petAge" "PetAge" NOT NULL,
ADD COLUMN     "petEnergyLevel" "PetEnergyLevel" NOT NULL,
ADD COLUMN     "petIndependenceLevel" "PetIndependenceLevel" NOT NULL,
ADD COLUMN     "petSize" "PetSize" NOT NULL,
ADD COLUMN     "petSpaceNeed" "PetSpaceNeed" NOT NULL;
