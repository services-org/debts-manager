import { PlusIcon } from "lucide-react";

import { AddDebtModel } from "./add-debt-model";
import { Button } from "@/components/ui/button";
import { useModel } from "@/hooks";

export const SectionHeader = () => {
    const { onOpen } = useModel();

    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="mx-2 bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-2xl font-bold text-clip whitespace-nowrap text-transparent md:text-3xl">
                Debts Overview
            </h2>

            <div className="space-y-2 space-x-2">
                <Button
                    className="bg-gradient-to-b from-amber-500 to-amber-700 transition-all hover:bg-gradient-to-br"
                    onClick={() => onOpen("add-debt")}
                >
                    <PlusIcon className="size-4 stroke-3" /> Add Debt
                </Button>
                <Button
                    className="bg-gradient-to-b from-amber-500 to-amber-700 transition-all hover:bg-gradient-to-br"
                    onClick={() => onOpen("add-group")}
                >
                    <PlusIcon className="size-4 stroke-3" /> Add Group
                </Button>
            </div>

            <AddDebtModel />
        </div>
    );
};

SectionHeader.displayName = "SectionHeader";
