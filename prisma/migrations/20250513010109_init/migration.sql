-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "profileUrl" TEXT,
    "publicKey" TEXT NOT NULL,
    "bannedUsers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Diary" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedDiary" (
    "id" TEXT NOT NULL,
    "diaryId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "encryptedKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedDiary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_publicKey_key" ON "User"("publicKey");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "Diary_ownerId_idx" ON "Diary"("ownerId");

-- CreateIndex
CREATE INDEX "SharedDiary_recipientId_idx" ON "SharedDiary"("recipientId");

-- CreateIndex
CREATE UNIQUE INDEX "SharedDiary_diaryId_recipientId_key" ON "SharedDiary"("diaryId", "recipientId");

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedDiary" ADD CONSTRAINT "SharedDiary_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedDiary" ADD CONSTRAINT "SharedDiary_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
