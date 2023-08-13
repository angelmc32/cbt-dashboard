/*
  Warnings:

  - Added the required column `imageUri` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Community` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "imageUri" TEXT NOT NULL,
ADD COLUMN     "symbol" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
