import { PrismaClient } from "@prisma/client";

// 为开发环境创建一个全局变量来防止多次实例化 PrismaClient
const globalForPrisma = global as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}
