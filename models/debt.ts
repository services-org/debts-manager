import { Schema, models, model, Types } from "mongoose";

export type TDebt = {
    _id: string;
    group: Types.ObjectId | string;
    status: "paid" | "unpaid";
    description: string;
    amount: number;
    userId: string;
    createdAt: Date;
};

const DebtsSchema = new Schema<TDebt>({
    group: { type: Schema.Types.ObjectId, ref: "Groups", required: true },
    status: { type: String, required: true, enum: ["paid", "unpaid"] },
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    userId: { type: String, required: true, index: true },
    createdAt: { type: Date, required: true },
});

export const Debts = models.Debts || model<TDebt>("Debts", DebtsSchema);
