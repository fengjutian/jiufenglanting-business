import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // 假设您有一个导出prisma客户端的文件
export const runtime = 'edge'

export async function GET() {
	try {
		const users = await prisma.user.findMany();
		return NextResponse.json(users, { status: 200 });
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json(
			{ error: "Failed to fetch users" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const { name, email } = await request.json();

		// 验证输入
		if (!name || !email) {
			return NextResponse.json(
				{ error: "Name and email are required" },
				{ status: 400 },
			);
		}

		const user = await prisma.user.create({
			data: { name, email },
		});

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		console.error("Error creating user:", error);
		return NextResponse.json(
			{ error: "Failed to create user" },
			{ status: 500 },
		);
	}
}
