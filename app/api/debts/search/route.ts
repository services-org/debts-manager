import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/lib/mongoose";
import { Debts } from "@/models/debt";

type TResult = {
    description: string;
    amount: number;
    count: number;
    _id: string;
};

export const POST = async (req: Request) => {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

        await DBConnection();

        const { search } = await req.json();
        if (!search) return NextResponse.json("Missing Data", { status: 400 });

        const debts = await Debts.find({
            userId,
            description: { $regex: search, $options: "i" },
        });

        const results = debts.reduce((acc: TResult[], debt) => {
            const index = acc.findIndex((item) => item.description === debt.description);
            if (index === -1) return acc.concat({ _id: debt._id, description: debt.description, amount: debt.amount, count: 1 });

            const { _id, description, amount, count } = acc[index];
            const updateItem = { _id, description, amount: amount + debt.amount, count: count + 1 };

            acc[index] = updateItem;
            return acc;
        }, []);

        return NextResponse.json(results, { status: 200 });
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => `${issue.path.join(", ")} ${issue.message}`).join(" | ");
        return NextResponse.json(errors || error.message, { status: 200 });
    }
};
