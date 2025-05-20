import { CheckCircleIcon, ClockIcon, DollarSignIcon, PieChart } from "lucide-react";
import { SummaryCard } from "./card";
import { TStatus } from "../table/form";

export type TDebt = {
	_id: string;
	amount: number;
	createdAt: string;
	description: string;
	status: TStatus;
};

type TSummaryCards = {
	debts: TDebt[];
};

export const SummaryCards = ({ debts }: TSummaryCards) => {
	const income = debts.filter((debt) => debt.status === "income").reduce((sum, debt) => sum + debt.amount, 0);
	const total = debts.filter((debt) => debt.status === "unpaid").reduce((sum, debt) => sum + debt.amount, 0);
	const paid = debts.filter((debt) => debt.status === "paid").reduce((sum, debt) => sum + debt.amount, 0);
	const unpaid = total - paid;

	const summaryData = [
		{ label: "Income", value: income, icon: <DollarSignIcon size={28} className="text-blue-500" />, accent: "from-blue-400 to-blue-600" },
		{ label: "Total Debts", value: total, icon: <PieChart size={28} className="text-purple-500" />, accent: "from-blue-400 to-blue-600" },
		{ label: "Paid", value: paid, icon: <CheckCircleIcon size={28} className="text-green-500" />, accent: "from-green-400 to-green-600" },
		{ label: "Unpaid", value: unpaid, icon: <ClockIcon size={28} className="text-yellow-500" />, accent: "from-yellow-400 to-yellow-600" },
	];

	return (
		<div className="flex flex-col order-1 md:order-2 space-y-8 md:col-span-1 col-span-3 items-center">
			{summaryData.map((props) => (
				<SummaryCard key={props.label} {...props} />
			))}
		</div>
	);
};
