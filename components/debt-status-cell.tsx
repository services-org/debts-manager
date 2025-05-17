import * as React from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

type TStatus = "paid" | "unpaid" | "overdue";

type TDebtStatusCellProps = { status: TStatus };

export const DebtStatusCell: React.FC<TDebtStatusCellProps> = ({ status }) => {
	switch (status) {
		case "paid":
			return (
				<>
					<CheckCircle className="text-green-500" size={18} /> <span className="capitalize text-gray-700">Paid</span>
				</>
			);
		case "unpaid":
			return (
				<>
					<Clock className="text-yellow-500" size={18} /> <span className="capitalize text-gray-700">Unpaid</span>
				</>
			);
		case "overdue":
			return (
				<>
					<XCircle className="text-red-500" size={18} /> <span className="capitalize text-gray-700">Overdue</span>
				</>
			);
		default:
			return null;
	}
};
