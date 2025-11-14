import * as prismaPkg from "@prisma/client";

// 为开发环境创建一个全局变量来防止多次实例化 PrismaClient
const globalForPrisma = global as unknown as {
	prisma: any | undefined;
};

const PrismaCtor = (prismaPkg as any).PrismaClient || (prismaPkg as any).default;
export const prisma = globalForPrisma.prisma || new PrismaCtor();

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}
