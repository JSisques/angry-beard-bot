/*
  Warnings:

  - You are about to drop the column `companyContext` on the `BotConfig` table. All the data in the column will be lost.
  - You are about to drop the column `customRules` on the `BotConfig` table. All the data in the column will be lost.
  - You are about to drop the column `repositoryId` on the `BotConfig` table. All the data in the column will be lost.
  - You are about to drop the column `botConfigId` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the `ReviewFocusArea` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `BotConfig` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `BotConfig` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BotConfig" DROP CONSTRAINT "BotConfig_repositoryId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewFocusArea" DROP CONSTRAINT "ReviewFocusArea_botConfigId_fkey";

-- DropIndex
DROP INDEX "BotConfig_repositoryId_key";

-- AlterTable
ALTER TABLE "BotConfig" DROP COLUMN "companyContext",
DROP COLUMN "customRules",
DROP COLUMN "repositoryId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "botConfigId";

-- DropTable
DROP TABLE "ReviewFocusArea";

-- CreateIndex
CREATE UNIQUE INDEX "BotConfig_userId_key" ON "BotConfig"("userId");

-- AddForeignKey
ALTER TABLE "BotConfig" ADD CONSTRAINT "BotConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
