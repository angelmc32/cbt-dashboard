-- DropIndex
DROP INDEX "Community_name_key";

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "communityAddress" TEXT;

-- CreateIndex
CREATE INDEX "Community_address_deployedByAddress_communityAddress_name_idx" ON "Community"("address", "deployedByAddress", "communityAddress", "name");

-- CreateIndex
CREATE INDEX "CommunityContract_address_deployedByAddress_communityId_idx" ON "CommunityContract"("address", "deployedByAddress", "communityId");

-- CreateIndex
CREATE INDEX "NftContract_address_deployedByAddress_idx" ON "NftContract"("address", "deployedByAddress");

-- CreateIndex
CREATE INDEX "SocialMediaUrl_communityId_idx" ON "SocialMediaUrl"("communityId");

-- CreateIndex
CREATE INDEX "User_address_email_name_idx" ON "User"("address", "email", "name");
