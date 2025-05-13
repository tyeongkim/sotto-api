/*
  Warnings:

  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accessToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashedPassword",
ALTER COLUMN "accessToken" DROP NOT NULL,
ALTER COLUMN "accessToken" DROP DEFAULT,
ALTER COLUMN "accessToken" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_accessToken_key" ON "User"("accessToken");
