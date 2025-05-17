import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import { Debt } from "@/models/debt";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	await connect();
	const body = await req.json();
	try {
		const debt = await Debt.findByIdAndUpdate(params.id, { ...body, amount: body.status === "unpaid" ? body.amount : -body.amount }, { new: true });
		if (!debt) return NextResponse.json({ error: "Not found" }, { status: 404 });
		return NextResponse.json(debt);
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 400 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	await connect();
	try {
		const debt = await Debt.findByIdAndDelete(params.id);
		if (!debt) return NextResponse.json({ error: "Not found" }, { status: 404 });
		return NextResponse.json({ success: true });
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 400 });
	}
}
