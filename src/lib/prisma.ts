import { PrismaClient } from "@prisma/client";

// 为开发环境创建一个全局变量来防止多次实例化 PrismaClient
const globalForPrisma = global as unknown as {
	prisma: PrismaClient | undefined;
};

const sqliteUrl = (process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== "")
  ? process.env.DATABASE_URL
  : (process.env.NETLIFY ? "file::memory:?cache=shared" : "file:./dev.db");

export const prisma = globalForPrisma.prisma || new PrismaClient({ datasources: { db: { url: sqliteUrl } } });

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}

export async function ensureSqliteSchema(): Promise<void> {
  const createUser = `
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );
  `;
  const createBusiness = `
    CREATE TABLE IF NOT EXISTS Business (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      address TEXT NOT NULL,
      type TEXT NOT NULL,
      contact TEXT NOT NULL,
      rating REAL,
      latitude REAL,
      longitude REAL,
      otherInfo TEXT,
      imageBase64 TEXT,
      description TEXT
    );
  `;
  await prisma.$executeRawUnsafe(createUser);
  await prisma.$executeRawUnsafe(createBusiness);
}
