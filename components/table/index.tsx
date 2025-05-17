"use client";
import { useState } from "react";

import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { useGet, useCreate, useUpdate, useDelete } from "@/hooks";
import { DebtForm, TDebtFormValues } from "./form";
import { DebtTableHeader } from "./table-header";
import { ConfirmDialog } from "../confirm-dialog";
import { DebtTableRow } from "./table-row";
import { CardHeader } from "./card-header";
import { TDebt } from "../summary-cards";

export const DebtTable = () => {
	const { data: debts = [], error, isLoading } = useGet("/debts?from=0&to=30", ["debts"]);
	const createDebt = useCreate("/debts", ["debts"]);
	const updateDebt = useUpdate("/debts", ["debts"]);
	const deleteDebt = useDelete("/debts", ["debts"]);

	const [localError, setLocalError] = useState<string>("");
	const [modalOpen, setModalOpen] = useState(false);
	const [editDebt, setEditDebt] = useState<TDebt>();
	const [deleteId, setDeleteId] = useState<string>();

	const onAdd = () => {
		setEditDebt({ description: "add" } as TDebt);
		setModalOpen(true);
	};

	const onEdit = (debt: TDebt) => {
		setEditDebt(debt);
		setModalOpen(true);
	};

	const onDelete = (_id: string) => {
		setDeleteId(_id);
	};

	const onCancelDelete = () => {
		setDeleteId(undefined);
	};

	const onConfirmDelete = async () => {
		if (!deleteId) return;
		deleteDebt.mutate(deleteId, {
			onError: (e: any) => setLocalError(e.message || "Failed to delete debt"),
			onSettled: () => setDeleteId(undefined),
		});
	};

	const onSubmit = async (values: TDebtFormValues) => {
		if (!editDebt) {
			return createDebt.mutate(values, {
				onError: (e: any) => setLocalError(e.message || "Failed to add debt"),
				onSuccess: () => setModalOpen(false),
			});
		}

		updateDebt.mutate(
			{ _id: editDebt._id, ...values },
			{
				onError: (e: any) => setLocalError(e.message || "Failed to update debt"),
				onSuccess: () => setModalOpen(false),
			}
		);
	};

	return (
		<div className="relative w-full md:col-span-2 col-span-3 bg-blue-50/60 rounded-2xl p-6 md:p-8 shadow-none">
			<CardHeader onAdd={onAdd} />
			{(error || localError) && <div className="text-red-500 mb-2">{String(error || localError)}</div>}

			<div className="overflow-x-auto">
				<Table className="min-w-full border-separate border-spacing-y-4 bg-transparent">
					<TableHeader>
						<DebtTableHeader />
					</TableHeader>

					<TableBody>
						{!isLoading && debts.map((debt: TDebt) => <DebtTableRow key={debt._id} debt={debt} onEdit={() => onEdit(debt)} onDelete={() => onDelete(debt._id)} />)}

						{!!isLoading &&
							Array(5)
								.fill(0)
								.map((_, index) => (
									<tr key={index}>
										<td colSpan={5} className="py-1 text-gray-500">
											<div className="w-full h-10 bg-gray-200 animate-pulse rounded-xl" />
										</td>
									</tr>
								))}
					</TableBody>
				</Table>
			</div>

			<DebtForm initialValues={editDebt} title={editDebt ? "Edit Debt" : "Add Debt"} onClose={() => setModalOpen(false)} onSubmit={onSubmit} open={modalOpen} />
			<ConfirmDialog open={!!deleteId} onConfirm={onConfirmDelete} onCancel={onCancelDelete} />
		</div>
	);
};
