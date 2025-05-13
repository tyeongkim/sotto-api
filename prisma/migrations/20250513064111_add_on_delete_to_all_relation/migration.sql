-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "SharedDiary" DROP CONSTRAINT "SharedDiary_diaryId_fkey";

-- DropForeignKey
ALTER TABLE "SharedDiary" DROP CONSTRAINT "SharedDiary_recipientId_fkey";

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedDiary" ADD CONSTRAINT "SharedDiary_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedDiary" ADD CONSTRAINT "SharedDiary_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
