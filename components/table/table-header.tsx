import { TableHead, TableRow } from "@/components/ui/table";

export const DebtTableHeader = () => (
	<TableRow className="bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 rounded-t-xl shadow text-white">
		<TableHead className="font-bold px-2 text-white">Description</TableHead>
		<TableHead className="font-bold px-2 text-white">Amount</TableHead>
		<TableHead className="font-bold px-2 text-white">Status</TableHead>
		<TableHead className="font-bold px-2 text-white">Created At</TableHead>
		<TableHead className="font-bold px-2 text-white">Actions</TableHead>
	</TableRow>
);
