import { NextResponse } from "next/server";
import { prisma, ensureSqliteSchema } from "@/lib/prisma";

export async function GET() {
	try {
		await ensureSqliteSchema();
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
		await ensureSqliteSchema();
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
