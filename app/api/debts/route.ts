import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/mongoose";
import { Debts } from "@/models/debt";
import { debtSchema } from "./schema";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const query = Object.fromEntries(new URL(req.url).searchParams.entries());
        const from = parseInt(query.from || "0");
        const to = parseInt(query.to || "100");

        const debts = await Debts.find()
            .select("description amount status createdAt")
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
        const data = debtSchema.parse(body);

        const debt = await Debts.create(data);
        return NextResponse.json(debt, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 400 });
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { _id, ...body } = await req.json();
        if (!_id) return NextResponse.json("ID is required", { status: 400 });

        const data = debtSchema.parse(body);
        const updatedDebt = await Debts.updateOne({ _id }, data);

        if (!updatedDebt.modifiedCount) return NextResponse.json("Something Is Wrong", { status: 400 });
        return NextResponse.json("Updated Successfully");
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 400 });
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { _id } = Object.fromEntries(new URL(req.url).searchParams.entries());
        if (!_id) return NextResponse.json("ID is required", { status: 400 });

        const debt = await Debts.findByIdAndDelete(_id);
        if (!debt) return NextResponse.json("Not found", { status: 400 });

        return NextResponse.json("Deleted Successfully");
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 400 });
    }
};
