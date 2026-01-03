import { cn } from "@/lib/utils";

type TAnalysisCard = {
    icon: React.ReactNode;
    value: number;
    label: string;
    variant?: "violet" | "amber" | "emerald" | "custom";
    color?: string;
};

const variantStyles = {
    violet: {
        bg: "bg-violet-50 dark:bg-violet-950/30",
        border: "border-violet-200 dark:border-violet-800/50",
        iconBg: "bg-violet-100 dark:bg-violet-900/50",
        text: "text-violet-700 dark:text-violet-300",
        value: "text-violet-900 dark:text-violet-100",
    },
    amber: {
        bg: "bg-amber-50 dark:bg-amber-950/30",
        border: "border-amber-200 dark:border-amber-800/50",
        iconBg: "bg-amber-100 dark:bg-amber-900/50",
        text: "text-amber-700 dark:text-amber-300",
        value: "text-amber-900 dark:text-amber-100",
    },
    emerald: {
        bg: "bg-emerald-50 dark:bg-emerald-950/30",
        border: "border-emerald-200 dark:border-emerald-800/50",
        iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
        text: "text-emerald-700 dark:text-emerald-300",
        value: "text-emerald-900 dark:text-emerald-100",
    },
    custom: {
        bg: "bg-slate-50 dark:bg-slate-800/50",
        border: "border-slate-200 dark:border-slate-700",
        iconBg: "bg-slate-100 dark:bg-slate-700",
        text: "text-slate-600 dark:text-slate-300",
        value: "text-slate-900 dark:text-slate-100",
    },
};

export const AnalysisCard = ({ label, value, icon, variant = "custom", color }: TAnalysisCard) => {
    const styles = variantStyles[variant];

    return (
        <div
            className={cn(
                "group relative flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 hover:shadow-md sm:gap-4 sm:rounded-2xl sm:p-4",
                styles.bg,
                styles.border,
            )}
        >
            {/* Icon container */}
            <div
                className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105 sm:size-12 sm:rounded-xl",
                    styles.iconBg,
                )}
                style={color ? { backgroundColor: `${color}20` } : undefined}
            >
                {icon}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <p className={cn("truncate text-xs font-medium sm:text-sm", styles.text)}>{label}</p>
                <p className={cn("text-lg font-bold sm:text-xl", styles.value)}>${value?.toLocaleString()}</p>
            </div>
        </div>
    );
};

AnalysisCard.displayName = "AnalysisCard";
