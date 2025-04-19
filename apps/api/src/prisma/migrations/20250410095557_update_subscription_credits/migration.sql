/*
  Warnings:

  - You are about to drop the column `maxReviews` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "maxReviews",
ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 20;
