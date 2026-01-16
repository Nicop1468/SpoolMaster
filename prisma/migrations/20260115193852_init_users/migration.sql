/*
  Warnings:

  - Added the required column `userId` to the `Spool` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "colorHex" TEXT NOT NULL,
    "initialWeight" REAL NOT NULL,
    "currentWeight" REAL NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "link" TEXT,
    "storage" TEXT DEFAULT 'Air Libre',
    "lastDried" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nozzleTemp" INTEGER NOT NULL DEFAULT 200,
    "bedTemp" INTEGER NOT NULL DEFAULT 60,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "note" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Spool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Spool" ("bedTemp", "brand", "color", "colorHex", "createdAt", "currentWeight", "id", "initialWeight", "lastDried", "link", "note", "nozzleTemp", "price", "rating", "storage", "type") SELECT "bedTemp", "brand", "color", "colorHex", "createdAt", "currentWeight", "id", "initialWeight", "lastDried", "link", "note", "nozzleTemp", "price", "rating", "storage", "type" FROM "Spool";
DROP TABLE "Spool";
ALTER TABLE "new_Spool" RENAME TO "Spool";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
