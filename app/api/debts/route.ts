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

export const PUT = async (req: NextRequest) => {
	try {
		await DBConnection();

		const { _id } = Object.fromEntries(new URL(req.url).searchParams.entries());
		const body = await req.json();

		const debt = await Debt.findByIdAndUpdate(_id, body, { new: true });
		if (!debt) return NextResponse.json("Not found", { status: 400 });

		return NextResponse.json(debt);
	} catch (error: any) {
		return NextResponse.json(error.message, { status: 400 });
	}
};

export const DELETE = async (req: NextRequest) => {
	try {
		await DBConnection();
		const { _id } = Object.fromEntries(new URL(req.url).searchParams.entries());

		const debt = await Debt.findByIdAndDelete(_id);
		if (!debt) return NextResponse.json("Not found", { status: 400 });

		return NextResponse.json({ success: true });
	} catch (error: any) {
		return NextResponse.json(error.message, { status: 400 });
	}
};
