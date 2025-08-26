import { Schema, models, model } from "mongoose";

type TDebt = {
	status: "paid" | "unpaid";
	description: string;
	createdAt: Date;
	amount: number;
};

const DebtsSchema = new Schema<TDebt>({
	description: { type: String, required: true, trim: true },
	amount: { type: Number, required: true },
	createdAt: { type: Date, required: true },
	status: { type: String, required: true, enum: ["paid", "unpaid"] },
});

export const Debts = models.Debts || model<TDebt>("Debts", DebtsSchema);
