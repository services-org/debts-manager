"use client";
import { useMemo, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { TDebtSchema } from "@/app/api/debts/schema";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/common";
import { useGet } from "@/hooks";

import { UpdateDebtModel } from "./models/update-debt-model";
import { DeleteDebtModel } from "./models/delete-debt-model";

import { AmountCell } from "./cells/amount";
import { ActionsCell } from "./cells/actions";
import { StatusCell } from "./cells/status";
import { GroupCell } from "./cells/group";

export const SectionBody = () => {
    const [showMore, setShowMore] = useState(false);
    const getDebts = useGet(`/debts?from=0&to=${showMore ? 10e6 : 5}`, ["debts", `show-${showMore}`]);

    const debts = useMemo(() => {
        if (!getDebts.data?.length) return [];
        return getDebts.data.map((debt: TDebtSchema & { _id: string }) => ({
            _id: debt._id,
            description: debt.description,
            group: <GroupCell group={debt.group} />,
            status: <StatusCell status={debt.status} />,
            amount: <AmountCell amount={debt.amount} />,
            createdAt: new Date(debt.createdAt).toISOString().split("T")[0],
            actions: <ActionsCell debt={debt} />,
        }));
    }, [getDebts.data]);

    return (
        <div className="p-3 sm:p-4">
            <div className="overflow-x-auto">
                <Table data={debts} isLoading={getDebts.isPending} />
            </div>

            <div className="mt-4 flex justify-center border-t border-slate-200 pt-4 dark:border-slate-700">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? (
                        <>
                            <ChevronUpIcon className="size-4" />
                            Show Less
                        </>
                    ) : (
                        <>
                            <ChevronDownIcon className="size-4" />
                            Show More
                        </>
                    )}
                </Button>
            </div>

            <DeleteDebtModel />
            <UpdateDebtModel />
        </div>
    );
};

SectionBody.displayName = "SectionBody";
