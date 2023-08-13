/*
  Warnings:

  - Added the required column `deployedByAddress` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('DEPLOYED', 'DRAFT', 'ERROR', 'PROCESSING');

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "deployedByAddress" TEXT NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CommunityContract" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "deployedByAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "baseUri" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NftContract" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "deployedByAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "baseUri" TEXT NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NftContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NftMetadata" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "externalUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NftMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommunityContract_address_key" ON "CommunityContract"("address");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityContract_communityId_key" ON "CommunityContract"("communityId");

-- CreateIndex
CREATE UNIQUE INDEX "NftContract_address_key" ON "NftContract"("address");

-- AddForeignKey
ALTER TABLE "CommunityContract" ADD CONSTRAINT "CommunityContract_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
