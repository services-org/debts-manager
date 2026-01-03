import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/lib/mongoose";
import { Groups } from "@/models/group";
import { Debts } from "@/models/debt";

/* Analysis:
	- Total = sum of ALL debts (paid + unpaid)
	- paid = sum of all paid amounts
	- unpaid = sum of all unpaid amounts
	- Per group breakdown with dynamic groups
*/
export const GET = async () => {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

        await DBConnection();

        // Get user's groups
        const groups = await Groups.find({ userId });

        // Get summary by status
        const [statusSummary] = await Debts.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: null,
                    total: { $sum: { $cond: [{ $eq: ["$status", "unpaid"] }, "$amount", 0] } },
                    unpaid: { $sum: { $cond: [{ $eq: ["$status", "paid"] }, { $multiply: ["$amount", -1] }, "$amount"] } },
                    paid: { $sum: { $cond: [{ $eq: ["$status", "paid"] }, "$amount", 0] } },
                },
            },
        ]);

        // Get summary by group (unpaid only)
        const groupSummary = await Debts.aggregate([
            { $match: { userId, status: "unpaid" } },
            {
                $group: {
                    _id: "$group",
                    amount: { $sum: "$amount" },
                },
            },
        ]);

        // Map group amounts with names
        const groupAmounts = groups.map((g) => {
            const found = groupSummary.find((gs) => gs._id.toString() === g._id.toString());
            return {
                _id: g._id,
                name: g.name,
                color: g.color,
                amount: found?.amount || 0,
            };
        });

        const result = {
            total: statusSummary?.total || 0,
            paid: statusSummary?.paid || 0,
            unpaid: statusSummary?.unpaid || 0,
            groups: groupAmounts,
        };

        return NextResponse.json(result);
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(error.message, { status: 400 });
    }
};
