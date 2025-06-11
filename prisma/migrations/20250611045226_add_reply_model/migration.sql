/*
  Warnings:

  - Made the column `accessToken` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "accessToken" SET NOT NULL;

-- CreateTable
CREATE TABLE "Reply" (
    "uuid" TEXT NOT NULL,
    "diaryId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "encryptedKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
