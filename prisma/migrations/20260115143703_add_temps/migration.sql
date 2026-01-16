/*
  Warnings:

  - You are about to alter the column `currentWeight` on the `Spool` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `initialWeight` on the `Spool` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `weight` on the `Consumption` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
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
    "bedTemp" INTEGER NOT NULL DEFAULT 60
);
INSERT INTO "new_Spool" ("brand", "color", "colorHex", "createdAt", "currentWeight", "id", "initialWeight", "lastDried", "link", "price", "storage", "type") SELECT "brand", "color", "colorHex", "createdAt", "currentWeight", "id", "initialWeight", "lastDried", "link", coalesce("price", 0) AS "price", "storage", "type" FROM "Spool";
DROP TABLE "Spool";
ALTER TABLE "new_Spool" RENAME TO "Spool";
CREATE TABLE "new_Consumption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spoolId" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "cost" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Consumption_spoolId_fkey" FOREIGN KEY ("spoolId") REFERENCES "Spool" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Consumption" ("cost", "createdAt", "id", "spoolId", "weight") SELECT "cost", "createdAt", "id", "spoolId", "weight" FROM "Consumption";
DROP TABLE "Consumption";
ALTER TABLE "new_Consumption" RENAME TO "Consumption";
CREATE TABLE "new_SpoolReference" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "colorName" TEXT NOT NULL,
    "colorHex" TEXT NOT NULL,
    "nozzleTemp" INTEGER NOT NULL DEFAULT 200,
    "bedTemp" INTEGER NOT NULL DEFAULT 60
);
INSERT INTO "new_SpoolReference" ("brand", "colorHex", "colorName", "id", "type") SELECT "brand", "colorHex", "colorName", "id", "type" FROM "SpoolReference";
DROP TABLE "SpoolReference";
ALTER TABLE "new_SpoolReference" RENAME TO "SpoolReference";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
