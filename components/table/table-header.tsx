import { TableHead, TableRow } from "@/components/ui/table";

export const DebtTableHeader = () => (
	<TableRow className="bg-gradient-to-b from-amber-500 to-amber-700 rounded-t-xl shadow text-white">
		<TableHead className="font-bold px-2 text-white">Description</TableHead>
		<TableHead className="font-bold px-2 text-white text-center">Amount</TableHead>
		<TableHead className="font-bold px-2 text-white text-center">Status</TableHead>
		<TableHead className="font-bold px-2 text-white text-center">Created At</TableHead>
		<TableHead className="font-bold px-2 text-white text-center">Actions</TableHead>
	</TableRow>
);
