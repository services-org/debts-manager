"use client";
import { useState } from "react";

import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from "@/components/ui/table";
import { useGet, useCreate, useUpdate, useDelete } from "@/hooks";
import { ConfirmDialog } from "../common/confirm-dialog";
import { DebtForm, TDebtFormValues } from "./form";
import { DebtTableHeader } from "./table-header";
import { DebtTableRow } from "./table-row";
import { CardHeader } from "./card-header";
import { TDebt } from "../summary-cards";

const today = new Date().toISOString().split("T")[0];
export const DebtTable = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const [editDebt, setEditDebt] = useState<TDebt>();
	const [deleteId, setDeleteId] = useState<string>();

	const [localError, setLocalError] = useState("");
	const [show, setShow] = useState(false);

	const getDebt = useGet(`/debts?from=0&to=${show ? 10e6 : 5}`, ["debts", `${show}`]);
	const updateDebt = useUpdate(`/debts?_id=${editDebt?._id}`, ["debts", "analysis"]);

	const deleteDebt = useDelete(`/debts?_id=${deleteId}`, ["debts", "analysis"]);
	const createDebt = useCreate("/debts", ["debts", "analysis"]);

	const onOpen = (debt: TDebt, type: "add" | "edit") => {
		if (type === "add") setEditDebt({ status: "unpaid", description: "add", amount: 0, createdAt: today } as TDebt);
		else setEditDebt(debt);
		setModalOpen(true);
	};

	const onDelete = async () => {
		if (!deleteId) return;

		deleteDebt.mutate(undefined, {
			onError: (e: any) => setLocalError(e.message || "Failed to delete debt"),
			onSettled: () => setDeleteId(undefined),
		});
	};

	const onSubmit = async (values: TDebtFormValues) => {
		if (editDebt?.description === "add") {
			return createDebt.mutate(values, {
				onError: (e: any) => setLocalError(e.message || "Failed to add debt"),
				onSuccess: () => setModalOpen(false),
			});
		}

		updateDebt.mutate(values, {
			onError: (e: any) => setLocalError(e.message || "Failed to update debt"),
			onSuccess: () => setModalOpen(false),
		});
	};

	return (
		<div className="relative w-full order-2 md:order-1 md:col-span-2 col-span-3 bg-blue-50/60 rounded-2xl md:p-8 shadow-none">
			<CardHeader onAdd={() => onOpen({ description: "add" } as TDebt, "add")} />

			{(getDebt.error || localError) && <div className="text-red-500 mb-2">{String(getDebt.error || localError)}</div>}

			<div className="overflow-x-auto">
				<Table className="min-w-full border-separate border-spacing-y-4 bg-transparent">
					<TableHeader>
						<DebtTableHeader />
					</TableHeader>

					<TableBody>
						{!getDebt.isLoading &&
							getDebt.data?.map((debt: TDebt) => (
								<DebtTableRow
									onDelete={() => setDeleteId(debt._id)}
									onEdit={() => onOpen(debt, "edit")}
									key={debt._id}
									debt={debt}
								/>
							))}

						{!!getDebt.isLoading &&
							Array(5)
								.fill(0)
								.map((_, index) => (
									<tr key={`key-${index}`}>
										<td colSpan={5} className="py-1 text-gray-500">
											<div className="w-full h-10 bg-gray-200 animate-pulse rounded-xl" />
										</td>
									</tr>
								))}
					</TableBody>

					{!getDebt.isLoading && (
						<TableFooter>
							<TableRow>
								<TableCell
									className="py-1 text-blue-500 hover:text-blue-700 cursor-pointer"
									onClick={() => setShow(!show)}
									colSpan={5}>
									Show more
								</TableCell>
							</TableRow>
						</TableFooter>
					)}
				</Table>
			</div>

			<DebtForm open={modalOpen} initialValues={editDebt} onClose={() => setModalOpen(false)} onSubmit={onSubmit} />
			<ConfirmDialog open={!!deleteId} onConfirm={onDelete} onCancel={() => setDeleteId(undefined)} />
		</div>
	);
};
