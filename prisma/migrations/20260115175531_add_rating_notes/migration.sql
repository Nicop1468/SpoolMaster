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
    "note" TEXT
);
INSERT INTO "new_Spool" ("bedTemp", "brand", "color", "colorHex", "createdAt", "currentWeight", "id", "initialWeight", "lastDried", "link", "nozzleTemp", "price", "storage", "type") SELECT "bedTemp", "brand", "color", "colorHex", "createdAt", "currentWeight", "id", "initialWeight", "lastDried", "link", "nozzleTemp", "price", "storage", "type" FROM "Spool";
DROP TABLE "Spool";
ALTER TABLE "new_Spool" RENAME TO "Spool";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
