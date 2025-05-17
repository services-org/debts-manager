import * as React from "react";
import { TableHead, TableRow } from "@/components/ui/table";

export const DebtTableHeader = () => (
	<TableRow className="bg-gray-100">
		<TableHead className="font-semibold text-gray-700">Description</TableHead>
		<TableHead className="font-semibold text-gray-700">Amount</TableHead>
		<TableHead className="font-semibold text-gray-700">Status</TableHead>
		<TableHead className="font-semibold text-gray-700">Created At</TableHead>
		<TableHead className="font-semibold text-gray-700">Actions</TableHead>
	</TableRow>
);
