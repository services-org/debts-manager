"use client";
import { CheckCircleIcon, ClockIcon, PieChartIcon, WalletIcon } from "lucide-react";

import { useTranslation } from "@/lib/i18n";
import { GroupCard } from "./group-card";
import { AnalysisCard } from "./card";
import { useGet } from "@/hooks";

type TCost = {
    unpaid: number;
    total: number;
    paid: number;
};

type TAnalysis = TCost & {
    groups: (TCost & {
        _id: string;
        name: string;
        color: string;
    })[];
};

export const AnalysisSection = () => {
    const { t } = useTranslation();
    const getAnalysis = useGet("/analysis", ["analysis"]);
    const analysis = getAnalysis.data as TAnalysis;

    return (
        <section className="space-y-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
                <WalletIcon className="size-5" />
                {t("analysis.groupsHeading")}
            </h3>

            {/* Main Stats - 3 column grid */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                <AnalysisCard
                    label={t("analysis.totalDebts")}
                    variant="violet"
                    value={analysis?.total || 0}
                    icon={<PieChartIcon className="size-5 text-violet-500 sm:size-6" />}
                />
                <AnalysisCard
                    label={t("analysis.unpaid")}
                    variant="amber"
                    value={analysis?.unpaid || 0}
                    icon={<ClockIcon className="size-5 text-amber-500 sm:size-6" />}
                />
                <AnalysisCard
                    label={t("analysis.paid")}
                    variant="emerald"
                    value={analysis?.paid || 0}
                    icon={<CheckCircleIcon className="size-5 text-emerald-500 sm:size-6" />}
                />
            </div>

            {/* Group Stats */}
            {analysis?.groups?.length > 0 && (
                <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
                        <WalletIcon className="size-5" />
                        {t("analysis.groupsBreakdown")}
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {analysis.groups.map((group) => (
                            <GroupCard
                                key={group._id}
                                name={group.name}
                                color={group.color}
                                total={group.total}
                                unpaid={group.unpaid}
                                paid={group.paid}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

AnalysisSection.displayName = "AnalysisSection";
