import { cn } from "@/lib/utils";

type TStatusCell = {
    status: "paid" | "unpaid";
};

export const StatusCell = ({ status }: TStatusCell) => {
    return (
        <span
            className={cn(
                `mx-auto block w-fit rounded-full px-3 py-1 text-center text-xs font-semibold text-black capitalize shadow`,
                status === "unpaid" && "bg-gradient-to-b from-amber-300 to-amber-500",
                status === "paid" && "bg-gradient-to-b from-green-300 to-green-500",
            )}
        >
            {status}
        </span>
    );
};

StatusCell.displayName = "StatusCell";
