import { NextResponse } from "next/server";

import { DBConnection } from "@/lib/mongoose";
import { Debts } from "@/models/debt";

/* Analysis:
	- Total = unpaid
	- unpaid = unpaid - paid
	- paid = paid
	- personal = personal [paid + unpaid]
	- civil = civil [paid + unpaid]

*/
export const GET = async () => {
    try {
        await DBConnection();

        // Get all debts with amount aggregations
        const [summary] = await Debts.aggregate([
            {
                $group: {
                    _id: null,

                    total: { $sum: { $cond: [{ $eq: ["$status", "unpaid"] }, "$amount", 0] } },

                    paid: { $sum: { $cond: [{ $eq: ["$status", "paid"] }, "$amount", 0] } },

                    personal: {
                        $sum: {
                            $cond: [{ $and: [{ $eq: ["$status", "unpaid"] }, { $eq: ["$group", "personal"] }] }, "$amount", 0],
                        },
                    },

                    civil: {
                        $sum: {
                            $cond: [{ $and: [{ $eq: ["$status", "unpaid"] }, { $eq: ["$group", "civil"] }] }, "$amount", 0],
                        },
                    },
                },
            },
        ]);

        const unpaid = summary.total - summary.paid;
        summary.unpaid = unpaid;

        return NextResponse.json(summary);
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(error.message, { status: 400 });
    }
};
