/*
  Warnings:

  - You are about to drop the column `description` on the `PullRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PullRequest" DROP COLUMN "description",
ADD COLUMN     "additions" INTEGER,
ADD COLUMN     "body" TEXT,
ADD COLUMN     "changedFiles" INTEGER,
ADD COLUMN     "commentsUrl" TEXT,
ADD COLUMN     "commits" INTEGER,
ADD COLUMN     "commitsUrl" TEXT,
ADD COLUMN     "deletions" INTEGER,
ADD COLUMN     "diffUrl" TEXT,
ADD COLUMN     "htmlUrl" TEXT,
ADD COLUMN     "isDraft" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isMergeable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isMerged" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRebaseable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "issueUrl" TEXT,
ADD COLUMN     "mergedAt" TIMESTAMP(3),
ADD COLUMN     "number" INTEGER,
ADD COLUMN     "patchUrl" TEXT,
ADD COLUMN     "reviewCommentsUrl" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "statusesUrl" TEXT,
ADD COLUMN     "url" TEXT,
ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "botConfigId" TEXT,
ADD COLUMN     "hasWiki" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "language" TEXT;
