import { Schema, models, model } from "mongoose";

type TDebt = {
    group: "personal" | "civil";
    status: "paid" | "unpaid";

    description: string;
    amount: number;

    createdAt: Date;
};

const DebtsSchema = new Schema<TDebt>({
    group: { type: String, required: true, enum: ["personal", "civil"] },
    status: { type: String, required: true, enum: ["paid", "unpaid"] },

    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },

    createdAt: { type: Date, required: true },
});

export const Debts = models.Debts || model<TDebt>("Debts", DebtsSchema);
