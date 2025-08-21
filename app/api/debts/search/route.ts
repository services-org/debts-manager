import { DBConnection } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { Debt } from "@/models/debt";

type TResult = {
	description: string;
	amount: number;
	count: number;
};

export const POST = async (req: Request) => {
	try {
		await DBConnection();

		const { search } = await req.json();
		if (!search) return NextResponse.json("Missing Data", { status: 400 });

		const debts = await Debt.find({
			description: { $regex: search, $options: "i" },
		});

		const results = debts.reduce((acc: TResult[], debt) => {
			const index = acc.findIndex((item) => item.description === debt.description);
			if (index === -1) return acc.concat({ description: debt.description, amount: debt.amount, count: 1 });

			const cur = acc[index];
			const updateItem = { description: cur.description, count: cur.count + 1, amount: cur.amount + debt.amount };

			acc[index] = updateItem;
			return acc;
		}, []);

		return NextResponse.json(results, { status: 200 });
	} catch (error: any) {
		const errors = error?.issues?.map((issue: any) => `${issue.path.join(", ")} ${issue.message}`).join(" | ");
		return NextResponse.json(errors || error.message, { status: 200 });
	}
};
