import { useFormContext, FieldError } from "react-hook-form";

type TInput = {
	name: string;
	label: string;
	type?: string;
	icon?: React.ReactNode;
};

export const Input = ({ name, label, type = "text", icon }: TInput) => {
	const form = useFormContext();
	const error = form.formState.errors[name] as FieldError;

	return (
		<div>
			<label htmlFor={name} className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
				{icon} {label}
			</label>
			<input {...form.register(name)} type={type} id={name} placeholder={label} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
			{error && <div className="text-red-500 text-sm">{error.message}</div>}
		</div>
	);
};
