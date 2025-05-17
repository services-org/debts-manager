import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/mongoose";
import { Debt } from "@/models/debt";

export const PUT = async (req: NextRequest, { params }: any) => {
	try {
		await DBConnection();
		const body = await req.json();

		const debt = await Debt.findByIdAndUpdate(params.id, body, { new: true });
		if (!debt) return NextResponse.json("Not found", { status: 400 });

		return NextResponse.json(debt);
	} catch (error: any) {
		return NextResponse.json(error.message, { status: 400 });
	}
};

export const DELETE = async (req: NextRequest, { params }: any) => {
	try {
		await DBConnection();
		const debt = await Debt.findByIdAndDelete(params.id);

		if (!debt) return NextResponse.json("Not found", { status: 400 });
		return NextResponse.json({ success: true });
	} catch (error: any) {
		return NextResponse.json(error.message, { status: 400 });
	}
};
