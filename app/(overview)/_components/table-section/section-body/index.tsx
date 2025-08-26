import { useMemo, useState } from "react";

import { TDebtSchema } from "@/app/api/debts/schema";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/common";
import { useGet } from "@/hooks";

import { UpdateDebtModel } from "./models/update-debt-model";
import { DeleteDebtModel } from "./models/delete-debt-model";

import { AmountCell } from "./cells/amount";
import { ActionsCell } from "./cells/actions";
import { StatusCell } from "./cells/status";

export const SectionBody = () => {
    const [showMore, setShowMore] = useState(false);

    const getDebts = useGet(`/debts?from=0&to=${showMore ? 10e6 : 5}`, ["debts", `show-${showMore}`]);

    const debts = useMemo(() => {
        if (!getDebts.data?.length) return [];
        return getDebts.data.map((debt: TDebtSchema & { _id: string }) => ({
            _id: debt._id,
            description: debt.description,
            status: <StatusCell status={debt.status} />,
            amount: <AmountCell amount={debt.amount} />,
            createdAt: new Date(debt.createdAt).toISOString().split("T")[0],
            actions: <ActionsCell debt={debt} />,
        }));
    }, [getDebts.data]);

    return (
        <div className="">
            <Table data={debts} />

            <Button
                className="ml-auto flex items-end bg-gradient-to-b from-amber-500 to-amber-700 hover:bg-gradient-to-br"
                onClick={() => setShowMore(!showMore)}
            >
                {showMore ? "Show Less" : "Show More"}
            </Button>

            <DeleteDebtModel />
            <UpdateDebtModel />
        </div>
    );
};

SectionBody.displayName = "SectionBody";
