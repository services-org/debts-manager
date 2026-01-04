import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/lib/mongoose";
import { Groups } from "@/models/group";
import { Debts } from "@/models/debt";
import { groupSchema } from "./schema";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId } = await auth();
        if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

        const groups = await Groups.find({ userId }).sort("name");
        return NextResponse.json(groups);
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 400 });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId } = await auth();
        if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

        const body = await req.json();
        const data = groupSchema.parse(body);

        const group = await Groups.create({ ...data, userId });
        return NextResponse.json(group, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json("Group name already exists", { status: 400 });
        }
        return NextResponse.json(error.message, { status: 400 });
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

        await DBConnection();

        const { _id, ...body } = await req.json();
        if (!_id) return NextResponse.json("ID is required", { status: 400 });

        const data = groupSchema.parse(body);
        const updatedGroup = await Groups.updateOne({ _id, userId }, data);

        if (!updatedGroup.modifiedCount) return NextResponse.json("Group not found", { status: 404 });
        return NextResponse.json("Updated Successfully");
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json("Group name already exists", { status: 400 });
        }
        return NextResponse.json(error.message, { status: 400 });
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

        await DBConnection();

        const { _id } = Object.fromEntries(new URL(req.url).searchParams.entries());
        if (!_id) return NextResponse.json("ID is required", { status: 400 });

        // Check if any debts are using this group
        const debtsWithGroup = await Debts.countDocuments({ group: _id, userId });
        if (debtsWithGroup > 0) {
            return NextResponse.json(`Cannot delete: ${debtsWithGroup} debts are using this group`, { status: 400 });
        }

        const group = await Groups.findOneAndDelete({ _id, userId });
        if (!group) return NextResponse.json("Group not found", { status: 404 });

        return NextResponse.json("Deleted Successfully");
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 400 });
    }
};
