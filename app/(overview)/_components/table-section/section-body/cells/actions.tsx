import { EditIcon, Trash2Icon } from "lucide-react";

import { TDebtSchema } from "@/app/api/debts/schema";
import { Button } from "@/components/ui/button";
import { useModel } from "@/hooks";

export const ActionsCell = ({ debt }: { debt: TDebtSchema & { _id: string } }) => {
    const { onOpen } = useModel();

    return (
        <div className="flex items-center justify-center gap-4">
            <Button
                className="border-amber-500 hover:bg-amber-50"
                onClick={() => onOpen("update-debt", { debt })}
                variant="outline"
                size="icon"
            >
                <EditIcon className="size-4 text-amber-600" />
            </Button>
            <Button
                className="border-red-500 hover:bg-red-50"
                onClick={() => onOpen("delete-debt", { debtId: debt._id })}
                variant="outline"
                size="icon"
            >
                <Trash2Icon className="size-4 text-red-600" />
            </Button>
        </div>
    );
};

ActionsCell.displayName = "ActionsCell";
