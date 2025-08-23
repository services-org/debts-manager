import { CheckCircleIcon, ClockIcon, PieChart } from "lucide-react";

import { TStatus } from "../table/form";
import { SummaryCard } from "./card";
import { useGet } from "@/hooks";

export type TDebt = {
	description: string;
	createdAt: string;
	amount: number;
	status: TStatus;
	_id: string;
};

export const SummaryCards = () => {
	const getAnalysis = useGet("/analysis", ["analysis"]);
	const { total, paid, unpaid } = getAnalysis.data || { total: 0, paid: 0, unpaid: 0 };

	const summaryData = [
		{
			icon: <PieChart size={28} className="text-purple-500" />,
			accent: "from-blue-400 to-blue-600",
			label: "Total Debts",
			value: total,
		},
		{
			icon: <ClockIcon size={28} className="text-yellow-500" />,
			accent: "from-yellow-400 to-yellow-600",
			label: "Unpaid",
			value: unpaid,
		},
		{
			icon: <CheckCircleIcon size={28} className="text-green-500" />,
			accent: "from-green-400 to-green-600",
			label: "Paid",
			value: paid,
		},
	];

	return (
		<div className="space-y-8 mb-6">
			{summaryData.map((props) => (
				<SummaryCard key={props.label} {...props} />
			))}
		</div>
	);
};
