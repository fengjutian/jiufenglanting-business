-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Business" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "rating" REAL DEFAULT 0.0,
    "latitude" REAL,
    "longitude" REAL,
    "otherInfo" TEXT,
    "imageBase64" TEXT,
    "description" TEXT
);
INSERT INTO "new_Business" ("address", "contact", "email", "id", "latitude", "longitude", "name", "otherInfo", "rating", "type") SELECT "address", "contact", "email", "id", "latitude", "longitude", "name", "otherInfo", "rating", "type" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
