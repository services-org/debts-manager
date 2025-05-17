import * as React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { DollarSign, CheckCircle, XCircle, Clock } from "lucide-react";

type TDebt = {
	_id: string;
	description: string;
	amount: number;
	createdAt: string;
	status: "paid" | "unpaid" | "overdue";
};

type TSummaryCardsProps = {
	debts: TDebt[];
};

export const SummaryCards: React.FC<TSummaryCardsProps> = ({ debts }) => {
	const total = debts.filter((d) => d.status === "unpaid").reduce((sum, d) => sum + Math.abs(d.amount), 0);
	const paid = debts.filter((d) => d.status === "paid").reduce((sum, d) => sum + Math.abs(d.amount), 0);
	const unpaid = total - paid;

	const summaryData = [
		{ label: "Total", value: total, icon: <DollarSign size={28} />, accent: "from-blue-400 to-blue-600" },
		{ label: "Paid", value: paid, icon: <CheckCircle size={28} />, accent: "from-green-400 to-green-600" },
		{ label: "Unpaid", value: unpaid, icon: <Clock size={28} />, accent: "from-yellow-400 to-yellow-600" },
	];

	const SummaryCard: React.FC<{ label: string; value: number; icon: React.ReactNode; accent: string }> = ({ label, value, icon, accent }) => (
		<div className="relative flex flex-col items-center bg-white/40 backdrop-blur-md rounded-2xl shadow-lg px-4 pt-8 pb-4 min-h-[160px] overflow-visible">
			<div className={`absolute top-0 left-0 w-full h-2 rounded-t-2xl bg-gradient-to-r ${accent}`} />
			<div className={`absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full bg-white/80 shadow-lg p-3 border-2 border-white`}>{icon}</div>
			<CardTitle className="mt-8 text-base font-semibold text-gray-800 tracking-wide">{label}</CardTitle>
			<CardContent className="text-3xl font-bold text-gray-900 mt-2">${value.toLocaleString()}</CardContent>
		</div>
	);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mb-10">
			{summaryData.map((props) => (
				<SummaryCard key={props.label} {...props} />
			))}
		</div>
	);
};
