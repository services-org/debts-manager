import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import { Debt } from "@/models/debt";

export async function GET() {
	await connect();
	const debts = await Debt.find().sort({ createdAt: -1 });
	return NextResponse.json(debts);
}

export async function POST(req: NextRequest) {
	await connect();
	const body = await req.json();
	try {
		const debt = await Debt.create({ ...body, amount: body.status === "unpaid" ? body.amount : -body.amount });
		return NextResponse.json(debt, { status: 201 });
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 400 });
	}
}
