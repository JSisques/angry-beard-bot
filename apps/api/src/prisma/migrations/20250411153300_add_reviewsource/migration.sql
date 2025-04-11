-- CreateEnum
CREATE TYPE "ReviewSource" AS ENUM ('GITHUB', 'GITLAB');

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "source" "ReviewSource";
