import { X, FileTextIcon, DollarSignIcon, CalendarIcon, CheckCircleIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import Image from "next/image";

import { Select } from "../common/select";
import { Input } from "../common/input";

export type TStatus = "paid" | "unpaid" | "income";

export type TDebtFormValues = {
	description: string;
	amount: number;
	createdAt: string;
	status: TStatus;
};

type TDebtFormProps = {
	onSubmit: (values: TDebtFormValues) => void;
	initialValues?: TDebtFormValues;
	onClose: () => void;
	open: boolean;
	title?: string;
};

const today = new Date().toISOString().split("T")[0];
const statusOptions = [
	{ value: "income", label: "Income" },
	{ value: "unpaid", label: "Unpaid" },
	{ value: "paid", label: "Paid" },
];

const defaultValues = { description: "", amount: 0, createdAt: today, status: "unpaid" as const };
export const DebtForm = ({ open, title, initialValues, onClose, onSubmit }: TDebtFormProps) => {
	const form = useForm<TDebtFormValues>({ defaultValues });

	useEffect(() => {
		if (initialValues?.description === "add") form.reset(defaultValues);
		const createdAt = initialValues?.createdAt ? new Date(initialValues.createdAt!).toISOString().split("T")[0] : initialValues?.createdAt;
		form.reset({ ...initialValues, createdAt });
	}, [initialValues]);

	if (!open) return null;

	return (
		<FormProvider {...form}>
			<div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm cursor-pointer" onClick={onClose} />

			<div className="bg-white rounded-xl z-50 shadow-xl w-full max-w-md p-6 animate-fade-in fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<button onClick={onClose} className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-gray-700">
					<X size={20} />
				</button>

				<div className="flex flex-col items-center mb-4">
					<Image
						src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80"
						className="w-16 h-16 rounded-full object-cover mb-2"
						alt="Debtor"
						height={64}
						width={64}
					/>
					<h2 className="text-xl font-bold text-gray-800">{title || (initialValues ? "Edit Debt" : "Add Debt")}</h2>
				</div>

				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<Input name="description" label="Description" icon={<FileTextIcon size={16} className="text-red-500" />} />
					<Input name="amount" label="Amount" type="number" icon={<DollarSignIcon size={16} className="text-blue-500" />} />
					<Input name="createdAt" label="Created At" type="date" icon={<CalendarIcon size={16} className="text-cyan-500" />} />
					<Select name="status" label="Status" options={statusOptions} icon={<CheckCircleIcon size={16} className="text-green-500" />} />

					<div className="flex justify-end gap-2 pt-2">
						<button type="button" onClick={onClose} className="px-4 py-2 cursor-pointer rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
							Cancel
						</button>
						<button type="submit" className="px-4 py-2 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700">
							Save
						</button>
					</div>
				</form>
			</div>
		</FormProvider>
	);
};
