import { useFormContext, FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

type TInput = {
	icon?: React.ReactNode;
	placeholder?: string;
	className?: string;
	label?: string;
	type?: string;
	name: string;
};

export const Input = ({ type, name, label, icon, placeholder, className }: TInput) => {
	const form = useFormContext();
	const error = form.formState.errors[name] as FieldError;

	return (
		<div className="w-full">
			{label && (
				<label htmlFor={name} className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-1">
					{icon} {label}
				</label>
			)}
			<input
				placeholder={label ?? placeholder}
				{...form.register(name)}
				type={type ?? "text"}
				id={name}
				className={cn(
					"w-full border border-slate-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500",
					className
				)}
			/>
			{error && <div className="text-red-500 text-sm">{error.message}</div>}
		</div>
	);
};
