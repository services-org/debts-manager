import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/mongoose";
import { Debt } from "@/models/debt";

export const GET = async (req: NextRequest) => {
	try {
		await DBConnection();

		const query = Object.fromEntries(new URL(req.url).searchParams.entries());
		const from = parseInt(query.from || "0");
		const to = parseInt(query.to || "100");

		const debts = await Debt.find()
			.sort("-createdAt")
			.skip(from)
			.limit(to - from);
		return NextResponse.json(debts);
	} catch (error: any) {
		return NextResponse.json(error.message, { status: 400 });
	}
};

export const POST = async (req: NextRequest) => {
	try {
		await DBConnection();
		const body = await req.json();

		const debt = await Debt.create(body);
		return NextResponse.json(debt, { status: 201 });
	} catch (error: any) {
		return NextResponse.json(error.message, { status: 400 });
	}
};
