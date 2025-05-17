import * as React from "react";
import { X, FileText, Calendar, DollarSign, CheckCircle, Clock, XCircle } from "lucide-react";

export type TDebtFormValues = {
	description: string;
	amount: number;
	createdAt: string;
	status: "paid" | "unpaid";
};

type TDebtFormProps = {
	open: boolean;
	onClose: () => void;
	onSubmit: (values: TDebtFormValues) => void;
	initialValues?: TDebtFormValues;

	title?: string;
};

const statusOptions = [
	{ value: "paid", label: "Paid", icon: <CheckCircle size={18} className="text-green-500" /> },
	{ value: "unpaid", label: "Unpaid", icon: <Clock size={18} className="text-yellow-500" /> },
];

const today = new Date().toISOString().split("T")[0];
export const DebtForm: React.FC<TDebtFormProps> = ({ open, onClose, onSubmit, initialValues, title }) => {
	const [form, setForm] = React.useState<TDebtFormValues>(initialValues || { description: "", amount: 0, createdAt: today, status: "unpaid" });
	const [error, setError] = React.useState<string>("");

	React.useEffect(() => {
		if (open) {
			setForm(initialValues || { description: "", amount: 0, createdAt: today, status: "unpaid" });
			setError("");
		}
	}, [open, initialValues, today]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: name === "amount" ? Number(value) : value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.description || !form.amount || !form.createdAt) {
			setError("All fields are required.");
			return;
		}
		onSubmit(form);
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
			<div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-fade-in">
				<button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
					<X size={20} />
				</button>
				<div className="flex flex-col items-center mb-4">
					<img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80" alt="Debtor" className="w-16 h-16 rounded-full object-cover mb-2" />
					<h2 className="text-xl font-bold text-gray-800">{title || (initialValues ? "Edit Debt" : "Add Debt")}</h2>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
							<FileText size={16} /> Description
						</label>
						<input
							type="text"
							name="description"
							value={form.description}
							onChange={handleChange}
							className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							placeholder="Debt description"
							required
						/>
					</div>
					<div>
						<label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
							<DollarSign size={16} /> Amount
						</label>
						<input
							type="number"
							name="amount"
							value={form.amount}
							onChange={handleChange}
							className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							min={1}
							placeholder="Amount"
							required
						/>
					</div>
					<div>
						<label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
							<Calendar size={16} /> Created At
						</label>
						<input
							type="date"
							name="createdAt"
							value={form.createdAt}
							onChange={handleChange}
							className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
						<select name="status" value={form.status} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
							{statusOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
					{error && <div className="text-red-500 text-sm">{error}</div>}
					<div className="flex justify-end gap-2 pt-2">
						<button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
							Cancel
						</button>
						<button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
