/*
  Warnings:

  - The primary key for the `Diary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Diary` table. All the data in the column will be lost.
  - The primary key for the `SharedDiary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SharedDiary` table. All the data in the column will be lost.
  - The required column `uuid` was added to the `Diary` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `SharedDiary` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "SharedDiary" DROP CONSTRAINT "SharedDiary_diaryId_fkey";

-- AlterTable
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "Diary_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "SharedDiary" DROP CONSTRAINT "SharedDiary_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "SharedDiary_pkey" PRIMARY KEY ("uuid");

-- AddForeignKey
ALTER TABLE "SharedDiary" ADD CONSTRAINT "SharedDiary_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
