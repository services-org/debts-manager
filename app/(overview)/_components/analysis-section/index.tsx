import { CheckCircleIcon, ClockIcon, PieChart } from "lucide-react";

import { ListItems } from "@/components/common";
import { AnalysisCard } from "./card";
import { useGet } from "@/hooks";

const data = (total: number, unpaid: number, paid: number) => [
    {
        _id: "1",
        value: total,
        label: "Total Debts",
        icon: <PieChart className="size-7 text-purple-500" />,
    },
    {
        _id: "2",
        value: unpaid,
        label: "Unpaid",
        icon: <ClockIcon className="size-7 text-yellow-500" />,
    },
    {
        _id: "3",
        value: paid,
        label: "Paid",
        icon: <CheckCircleIcon className="size-7 text-green-500" />,
    },
];

export const AnalysisSection = () => {
    const getAnalysis = useGet("/analysis", ["analysis"]);
    const analysis = getAnalysis.data;

    return (
        <div className="mb-6 space-y-8">
            <ListItems items={data(analysis?.total, analysis?.unpaid, analysis?.paid)} Item={AnalysisCard} />
        </div>
    );
};

AnalysisSection.displayName = "AnalysisSection";
