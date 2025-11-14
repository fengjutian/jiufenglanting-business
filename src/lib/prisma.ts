import { PrismaClient } from "@prisma/client";

// 为开发环境创建一个全局变量来防止多次实例化 PrismaClient
const globalForPrisma = global as unknown as {
	prisma: PrismaClient | undefined;
};

const sqliteUrl = (process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== "")
  ? process.env.DATABASE_URL
  : (process.env.NETLIFY ? "file:dev?mode=memory&cache=shared" : "file:./dev.db");

export const prisma = globalForPrisma.prisma || new PrismaClient({ datasources: { db: { url: sqliteUrl } } });

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}
