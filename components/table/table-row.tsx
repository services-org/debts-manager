import { TableCell, TableRow } from "@/components/ui/table";
import { DebtActionsCell } from "./actions-cell";
import { TStatus } from "./form";
import { cn } from "@/lib/utils";

type TDebt = {
	_id: string;
	description: string;
	amount: number;
	createdAt: string;
	status: TStatus;
};

type TDebtTableRowProps = {
	debt: TDebt;
	onEdit: () => void;
	onDelete: () => void;
};

export const DebtTableRow: React.FC<TDebtTableRowProps> = ({ debt, onEdit, onDelete }) => (
	<TableRow key={debt._id} className="bg-white rounded-2xl shadow-md transition-all hover:shadow-xl my-4">
		<TableCell className="py-4 px-4 text-gray-900 text-base font-medium align-middle">{debt.description}</TableCell>

		<TableCell className="py-4 px-4 align-middle">
			<span className="inline-block bg-blue-500 text-white text-base font-bold rounded-lg px-4 py-1 shadow">${debt.amount.toLocaleString()}</span>
		</TableCell>

		<TableCell className="py-4 px-4 align-middle">
			<span
				className={cn(
					`inline-block capitalize px-3 py-1 rounded-full text-xs font-semibold shadow`,
					debt.status === "unpaid" && "bg-yellow-100 text-yellow-700",
					debt.status === "paid" && "bg-green-100 text-green-700",
					debt.status === "income" && "bg-blue-100 text-blue-700"
				)}>
				{debt.status}
			</span>
		</TableCell>

		<TableCell className="py-4 px-4 text-gray-700 align-middle">{new Date(debt.createdAt).toISOString().split("T")[0]}</TableCell>

		<TableCell className="py-4 px-4 align-middle">
			<DebtActionsCell onEdit={onEdit} onDelete={onDelete} />
		</TableCell>
	</TableRow>
);
