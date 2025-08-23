import { EditIcon, Trash2Icon } from "lucide-react";

import { TableCell, TableRow } from "@/components/ui/table";
import { TStatus } from "./form";
import { cn } from "@/lib/utils";

type TDebt = {
	description: string;
	createdAt: string;
	status: TStatus;
	amount: number;
	_id: string;
};

type TDebtTableRow = {
	onDelete: () => void;
	onEdit: () => void;
	debt: TDebt;
};

export const DebtTableRow = ({ debt, onEdit, onDelete }: TDebtTableRow) => (
	<TableRow key={debt._id} className="bg-white rounded-2xl shadow-md transition-all hover:shadow-xl my-4">
		<TableCell className="p-4 text-gray-900 text-base font-medium align-middle">{debt.description}</TableCell>

		<TableCell className="p-4 text-center align-middle">
			<span className="inline-block bg-gradient-to-b from-amber-500 to-amber-700 text-white text-base font-bold rounded-lg px-4 py-1 shadow">
				${debt.amount.toLocaleString()}
			</span>
		</TableCell>

		<TableCell className="p-4 align-middle">
			<span
				className={cn(
					`w-fit block capitalize px-3 py-1 rounded-full text-xs font-semibold shadow mx-auto text-center`,
					debt.status === "unpaid" && "bg-gradient-to-b from-amber-300 to-amber-500 text-black",
					debt.status === "paid" && "bg-gradient-to-b from-green-300 to-green-500 text-black"
				)}>
				{debt.status}
			</span>
		</TableCell>

		<TableCell className="p-4 text-gray-700 align-middle text-center">
			{new Date(debt.createdAt).toISOString().split("T")[0]}
		</TableCell>

		<TableCell className="p-4 align-middle">
			<div className="flex gap-4 items-center justify-center">
				<button
					className="p-2 rounded border border-amber-500 hover:bg-amber-50 cursor-pointer"
					onClick={onEdit}
					title="Edit">
					<EditIcon className="text-amber-600 size-4" />
				</button>
				<button
					className="p-2 rounded border border-red-500 hover:bg-red-50 cursor-pointer"
					onClick={onDelete}
					title="Delete">
					<Trash2Icon size={16} className="text-red-600" />
				</button>
			</div>
		</TableCell>
	</TableRow>
);
