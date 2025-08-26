import { NextResponse } from "next/server";

import { DBConnection } from "@/lib/mongoose";
import { Debts } from "@/models/debt";

export const GET = async () => {
	try {
		await DBConnection();
		const summary = await Debts.aggregate([{ $group: { _id: "$status", value: { $sum: "$amount" } } }]);

		const unpaid = summary.find((item) => item._id === "unpaid");
		const paid = summary.find((item) => item._id === "paid");

		const analysis = { total: unpaid?.value, paid: paid?.value, unpaid: unpaid?.value - paid?.value };
		return NextResponse.json(analysis);
	} catch (error: any) {
		console.log(error.message);
		return NextResponse.json(error.message, { status: 400 });
	}
};
