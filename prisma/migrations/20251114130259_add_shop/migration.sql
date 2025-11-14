-- CreateTable
CREATE TABLE "shops" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "image_base64" TEXT,
    "rating" REAL DEFAULT 0.0,
    "review" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "shop_type" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "description" TEXT
);
