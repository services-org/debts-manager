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
                <label htmlFor={name} className="mb-1 flex items-center gap-1 text-sm font-semibold text-gray-800">
                    {icon} {label}
                </label>
            )}
            <input
                {...form.register(name, { valueAsNumber: type === "number" })}
                placeholder={label ?? placeholder}
                type={type ?? "text"}
                id={name}
                className={cn(
                    "w-full rounded-lg border border-slate-500 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400 focus:outline-none",
                    className,
                )}
            />
            {error && <div className="text-sm text-red-500">{error.message}</div>}
        </div>
    );
};
