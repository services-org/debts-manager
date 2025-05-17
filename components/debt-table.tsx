"use client";
import * as React from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Search, Plus } from "lucide-react";
import { DebtForm, TDebtFormValues } from "./debt-form";
import { DebtTableHeader } from "./debt-table-header";
import { DebtTableRow } from "./debt-table-row";
import { ConfirmDialog } from "./confirm-dialog";
import { useGetDebts, useCreateDebt, useUpdateDebt, useDeleteDebt } from "@/lib/hooks/use-debts";

type TDebt = {
	_id: string;
	description: string;
	amount: number;
	createdAt: string;
	status: "paid" | "unpaid";
};

export const DebtTable = () => {
	const { data: debts = [], isLoading, error } = useGetDebts();
	const createDebt = useCreateDebt();
	const updateDebt = useUpdateDebt();
	const deleteDebt = useDeleteDebt();

	const [modalOpen, setModalOpen] = React.useState(false);
	const [editDebt, setEditDebt] = React.useState<TDebt | null>(null);
	const [deleteId, setDeleteId] = React.useState<string | null>(null);
	const [localError, setLocalError] = React.useState<string>("");

	console.log(debts);

	const handleAdd = () => {
		setEditDebt(null);
		setModalOpen(true);
	};

	const handleEdit = (debt: TDebt) => {
		setEditDebt(debt);
		setModalOpen(true);
	};

	const handleDelete = (_id: string) => {
		setDeleteId(_id);
	};

	const confirmDelete = async () => {
		if (deleteId) {
			deleteDebt.mutate(deleteId, {
				onError: (e: any) => setLocalError(e.message || "Failed to delete debt"),
				onSettled: () => setDeleteId(null),
			});
		}
	};

	const cancelDelete = () => setDeleteId(null);

	const handleSubmit = async (values: TDebtFormValues) => {
		if (editDebt) {
			updateDebt.mutate(
				{ _id: editDebt._id, ...values },
				{
					onError: (e: any) => setLocalError(e.message || "Failed to update debt"),
					onSuccess: () => setModalOpen(false),
				}
			);
		} else {
			createDebt.mutate(values, {
				onError: (e: any) => setLocalError(e.message || "Failed to add debt"),
				onSuccess: () => setModalOpen(false),
			});
		}
	};

	return (
		<div className="relative w-full max-w-4xl mx-auto rounded-xl shadow-lg p-6 overflow-hidden bg-transparent">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
				<h2 className="text-2xl font-bold text-gray-800">Debts Overview</h2>
				<div className="flex gap-2 w-full sm:w-auto">
					<div className="relative flex-1 sm:w-64">
						<input
							type="text"
							placeholder="Search description..."
							className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-sm"
							disabled
						/>
						<Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
					</div>
					<button onClick={handleAdd} className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
						<Plus size={18} /> Add
					</button>
				</div>
			</div>
			{(error || localError) && <div className="text-red-500 mb-2">{String(error || localError)}</div>}
			{isLoading ? (
				<div className="text-center py-10 text-gray-500">Loading...</div>
			) : (
				<div className="overflow-x-auto">
					<Table className="min-w-full">
						<TableHeader>
							<DebtTableHeader />
						</TableHeader>
						<TableBody>
							{debts.map((debt: TDebt) => (
								<DebtTableRow key={debt._id} debt={debt} onEdit={() => handleEdit(debt)} onDelete={() => handleDelete(debt._id)} />
							))}
						</TableBody>
					</Table>
				</div>
			)}
			<DebtForm
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onSubmit={handleSubmit}
				initialValues={editDebt ? { ...editDebt, status: editDebt.status } : undefined}
				title={editDebt ? "Edit Debt" : "Add Debt"}
			/>
			<ConfirmDialog open={!!deleteId} onConfirm={confirmDelete} onCancel={cancelDelete} message="Are you sure you want to delete this debt?" />
		</div>
	);
};
