import * as React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { DebtStatusCell } from "./debt-status-cell";
import { DebtActionsCell } from "./debt-actions-cell";

type TDebt = {
	_id: string;
	description: string;
	amount: number;
	createdAt: string;
	status: "paid" | "unpaid" | "overdue";
};

type TDebtTableRowProps = {
	debt: TDebt;
	onEdit: () => void;
	onDelete: () => void;
};

export const DebtTableRow: React.FC<TDebtTableRowProps> = ({ debt, onEdit, onDelete }) => (
	<TableRow key={debt._id} className="transition-colors hover:bg-blue-50/80">
		<TableCell className="py-3 px-4 text-gray-900 align-middle">{debt.description}</TableCell>
		<TableCell className="py-3 px-4 text-gray-900 font-medium align-middle">${debt.amount.toLocaleString()}</TableCell>
		<TableCell className="py-3 px-4 flex items-center gap-2 align-middle">
			<DebtStatusCell status={debt.status} />
		</TableCell>
		<TableCell className="py-3 px-4 text-gray-700 align-middle">{new Date(debt.createdAt).toISOString().split("T")[0]}</TableCell>
		<TableCell className="py-3 px-4 align-middle">
			<DebtActionsCell onEdit={onEdit} onDelete={onDelete} />
		</TableCell>
	</TableRow>
);
