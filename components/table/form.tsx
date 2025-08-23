import { X, FileTextIcon, DollarSignIcon, CalendarIcon, CheckCircleIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import Image from "next/image";

import { Select } from "../ui/select";
import { Input } from "../ui/input";

export type TStatus = "paid" | "unpaid";

export type TDebtFormValues = {
	description: string;
	createdAt: string;
	amount: number;
	status: TStatus;
};

type TDebtFormProps = {
	onSubmit: (values: TDebtFormValues) => void;
	initialValues?: TDebtFormValues;
	onClose: () => void;
	open: boolean;
};

const today = new Date().toISOString().split("T")[0];
const statusOptions = [
	{ value: "unpaid", label: "Unpaid" },
	{ value: "paid", label: "Paid" },
];

const defaultValues = { description: "", amount: 0, createdAt: today, status: "unpaid" as const };
export const DebtForm = ({ open, initialValues, onClose, onSubmit }: TDebtFormProps) => {
	const form = useForm<TDebtFormValues>({ defaultValues });

	useEffect(() => {
		if (initialValues?.description === "add") form.reset(defaultValues);
		const createdAt = new Date(initialValues?.createdAt ?? Date.now()).toISOString().split("T")[0];
		form.reset({ ...initialValues, createdAt });
	}, [initialValues]);

	if (!open) return;

	return (
		<FormProvider {...form}>
			<div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm cursor-pointer" onClick={onClose} />

			<div className="bg-white rounded-xl z-50 shadow-xl w-full max-w-md p-6 animate-fade-in fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<Image
					className="absolute object-cover inset-0 z-0 opacity-10"
					src="/form-background.jpg"
					alt="Debtor"
					fill
				/>

				<button
					className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-gray-700"
					onClick={onClose}>
					<X size={20} />
				</button>

				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 relative z-10">
					<h2 className="relative text-center text-2xl font-bold z-10 mb-4 text-clip bg-gradient-to-b from-amber-500 to-amber-700 text-transparent bg-clip-text">
						{initialValues?.description === "add" ? "Add Debt" : "Edit Debt"}
					</h2>

					<Input icon={<FileTextIcon className="text-red-500 size-4" />} name="description" label="Description" />

					<Input
						icon={<DollarSignIcon className="text-blue-500 size-4" />}
						name="amount"
						label="Amount"
						type="number"
					/>

					<Input
						icon={<CalendarIcon className="text-cyan-500 size-4" />}
						name="createdAt"
						label="Created At"
						type="date"
					/>

					<Select
						icon={<CheckCircleIcon className="text-green-500 size-4" />}
						options={statusOptions}
						name="status"
						label="Status"
					/>

					<div className="flex justify-end gap-2 pt-2">
						<button
							className="px-4 py-2 cursor-pointer rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
							onClick={onClose}
							type="button">
							Cancel
						</button>
						<button
							className="px-4 py-2 cursor-pointer rounded-lg bg-amber-600 text-white hover:bg-amber-700"
							type="submit">
							Save
						</button>
					</div>
				</form>
			</div>
		</FormProvider>
	);
};
