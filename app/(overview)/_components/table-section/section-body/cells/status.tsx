import { cn } from "@/lib/utils";

type TStatusCell = {
    status: "paid" | "unpaid";
};

export const StatusCell = ({ status }: TStatusCell) => {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                status === "unpaid" && "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                status === "paid" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
            )}
        >
            {status}
        </span>
    );
};

StatusCell.displayName = "StatusCell";
