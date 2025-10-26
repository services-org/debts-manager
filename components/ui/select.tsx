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
        <div className="w-full">
            <label htmlFor={name} className="mb-1 flex items-center gap-1 text-sm font-semibold text-gray-800">
                {icon} {label}
            </label>

            <select
                className="w-full rounded-lg border border-slate-500 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                {...form.register(name)}
                id={name}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && <div className="text-sm text-red-500">{error.message}</div>}
        </div>
    );
};
