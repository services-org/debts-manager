import mongoose from "mongoose";

const DebtSchema = new mongoose.Schema({
	description: { type: String, required: true },
	amount: { type: Number, required: true },
	createdAt: { type: Date, required: true },
	status: { type: String, enum: ["paid", "unpaid"], required: true },
});

export const Debt = mongoose.models.Debt || mongoose.model("Debt", DebtSchema);
