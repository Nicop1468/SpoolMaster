/*
  Warnings:

  - You are about to drop the `EmptySpoolType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FilamentReference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Printer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `amsSlot` on the `Spool` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EmptySpoolType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FilamentReference";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Printer";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SpoolReference" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "colorName" TEXT NOT NULL,
    "colorHex" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "colorHex" TEXT NOT NULL,
    "initialWeight" INTEGER NOT NULL,
    "currentWeight" INTEGER NOT NULL,
    "price" REAL,
    "link" TEXT,
    "storage" TEXT DEFAULT 'Air Libre',
    "lastDried" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Spool" ("brand", "color", "colorHex", "createdAt", "currentWeight", "id", "initialWeight", "lastDried", "link", "price", "storage", "type") SELECT "brand", "color", "colorHex", "createdAt", "currentWeight", "id", "initialWeight", "lastDried", "link", "price", "storage", "type" FROM "Spool";
DROP TABLE "Spool";
ALTER TABLE "new_Spool" RENAME TO "Spool";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
