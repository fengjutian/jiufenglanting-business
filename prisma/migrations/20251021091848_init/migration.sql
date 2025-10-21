/*
  Warnings:

  - Added the required column `address` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
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
    "rating" REAL,
    "latitude" REAL,
    "longitude" REAL,
    "otherInfo" TEXT
);
INSERT INTO "new_Business" ("email", "id", "name") SELECT "email", "id", "name" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
CREATE UNIQUE INDEX "Business_email_key" ON "Business"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
