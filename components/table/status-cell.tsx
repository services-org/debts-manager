import { CheckCircle, Clock } from "lucide-react";
import { Fragment } from "react";
import { TStatus } from "./form";

type TDebtStatusCellProps = { status: TStatus };

export const DebtStatusCell: React.FC<TDebtStatusCellProps> = ({ status }: TDebtStatusCellProps) => {
	if (status === "paid")
		return (
			<Fragment>
				<CheckCircle className="text-green-500" size={18} />
				<span className="capitalize text-gray-700">Paid</span>
			</Fragment>
		);

	if (status === "unpaid")
		return (
			<Fragment>
				<Clock className="text-yellow-500" size={18} />
				<span className="capitalize text-gray-700">Unpaid</span>
			</Fragment>
		);
};
