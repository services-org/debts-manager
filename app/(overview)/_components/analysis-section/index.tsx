"use client";
import { CheckCircleIcon, ClockIcon, PieChartIcon } from "lucide-react";

import { ListItems } from "@/components/common";
import { AnalysisCard } from "./card";
import { useGet } from "@/hooks";

type TGroupAnalysis = {
    _id: string;
    name: string;
    color: string;
    amount: number;
};

export const AnalysisSection = () => {
    const getAnalysis = useGet("/analysis", ["analysis"]);
    const analysis = getAnalysis.data;

    // Build static cards
    const staticCards = [
        {
            _id: "total",
            value: analysis?.total || 0,
            label: "Total Debts",
            icon: <PieChartIcon className="size-5 text-violet-500 sm:size-6" />,
            variant: "violet" as const,
        },
        {
            _id: "unpaid",
            value: analysis?.unpaid || 0,
            label: "Unpaid",
            icon: <ClockIcon className="size-5 text-amber-500 sm:size-6" />,
            variant: "amber" as const,
        },
        {
            _id: "paid",
            value: analysis?.paid || 0,
            label: "Paid",
            icon: <CheckCircleIcon className="size-5 text-emerald-500 sm:size-6" />,
            variant: "emerald" as const,
        },
    ];

    // Build dynamic group cards
    const groupCards = (analysis?.groups || []).map((g: TGroupAnalysis) => ({
        _id: g._id,
        value: g.amount,
        label: g.name,
        color: g.color,
        icon: <ClockIcon className="size-5 sm:size-6" style={{ color: g.color }} />,
        variant: "custom" as const,
    }));

    const allCards = [...staticCards, ...groupCards];

    return (
        <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 sm:text-xl dark:text-slate-200">Analytics</h2>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <ListItems items={allCards} Item={AnalysisCard} />
            </div>
        </div>
    );
};

AnalysisSection.displayName = "AnalysisSection";
