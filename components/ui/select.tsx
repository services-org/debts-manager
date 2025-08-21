import { FieldError, useFormContext } from "react-hook-form";

type TSelect = {
	name: string;
	label: string;
	options: { value: string; label: string }[];
	icon?: React.ReactNode;
};

export const Select = ({ name, label, options, icon }: TSelect) => {
	const form = useFormContext();
	const error = form.formState.errors[name] as FieldError;

	return (
		<div>
			<label htmlFor={name} className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
				{icon} {label}
			</label>
			<select {...form.register(name)} id={name} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{error && <div className="text-red-500 text-sm">{error.message}</div>}
		</div>
	);
};
