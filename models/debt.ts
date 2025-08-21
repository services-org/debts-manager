import mongoose from "mongoose";

const DebtSchema = new mongoose.Schema({
	description: { type: String, required: true },
	amount: { type: Number, required: true },
	createdAt: { type: Date, required: true },
	status: { type: String, required: true, enum: ["paid", "unpaid", "income"] },
});

export const Debt = mongoose.models.Debt || mongoose.model("Debt", DebtSchema);
