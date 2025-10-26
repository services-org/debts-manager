import { cn } from "@/lib/utils";

type TGroupCell = {
    group: "personal" | "civil";
};

export const GroupCell = ({ group }: TGroupCell) => {
    return (
        <span
            className={cn(
                `mx-auto block w-fit rounded-full px-3 py-1 text-center text-xs font-semibold capitalize shadow`,
                group === "personal" && "bg-linear-to-b from-green-300 to-green-500 text-black",
                group === "civil" && "bg-linear-to-b from-amber-500 to-amber-700 text-white",
            )}
        >
            {group}
        </span>
    );
};

GroupCell.displayName = "GroupCell";
