import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";

type TDebtActionsCellProps = {
	onEdit: () => void;
	onDelete: () => void;
};

export const DebtActionsCell: React.FC<TDebtActionsCellProps> = ({ onEdit, onDelete }) => (
	<div className="flex gap-2 justify-center align-middle">
		<button onClick={onEdit} className="p-1 rounded hover:bg-blue-100 cursor-pointer" title="Edit">
			<Pencil size={16} className="text-blue-600" />
		</button>
		<button onClick={onDelete} className="p-1 rounded hover:bg-red-100 cursor-pointer" title="Delete">
			<Trash2 size={16} className="text-red-600" />
		</button>
	</div>
);
