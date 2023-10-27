/*
  Warnings:

  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_pet_id_fkey";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "images" TEXT[],
ADD COLUMN     "requirements" TEXT[];

-- DropTable
DROP TABLE "images";
