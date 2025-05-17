import { Plus } from "lucide-react";

type TCardHeader = {
	onAdd: () => void;
};

export const CardHeader = ({ onAdd }: TCardHeader) => {
	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
			<h2 className="text-2xl font-bold text-gray-800">Debts Overview</h2>
			<div className="flex gap-2 w-full sm:w-auto">
				<button onClick={onAdd} className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
					<Plus size={18} /> Add
				</button>
			</div>
		</div>
	);
};
