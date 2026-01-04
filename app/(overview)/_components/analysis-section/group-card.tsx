import { CheckCircleIcon, ClockIcon, PieChartIcon } from "lucide-react";

import { useTranslation } from "@/lib/i18n";

type TGroupCard = {
    name: string;
    color: string;
    total: number;
    unpaid: number;
    paid: number;
};

export const GroupCard = ({ name, color, total, unpaid, paid }: TGroupCard) => {
    const { t } = useTranslation();
    const paidPercentage = total > 0 ? Math.round((paid / total) * 100) : 0;

    return (
        <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50">
            {/* Color accent bar */}
            <div className="h-1.5" style={{ backgroundColor: color }} />

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-700/50">
                <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${color}20` }}
                >
                    <PieChartIcon className="size-5" style={{ color }} />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">{name}</h3>
            </div>

            {/* Stats List - Vertical layout */}
            <div className="space-y-3 p-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400">
                        <PieChartIcon className="size-4" />
                        <span>{t("analysis.total")}</span>
                    </div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">${total?.toLocaleString()}</p>
                </div>

                {/* Unpaid */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                        <ClockIcon className="size-4" />
                        <span>{t("analysis.unpaid")}</span>
                    </div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">${unpaid?.toLocaleString()}</p>
                </div>

                {/* Paid */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                        <CheckCircleIcon className="size-4" />
                        <span>{t("analysis.paid")}</span>
                    </div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">${paid?.toLocaleString()}</p>
                </div>

                {/* Progress bar */}
                <div className="pt-2">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                        <div
                            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                            style={{ width: `${paidPercentage}%` }}
                        />
                    </div>
                    <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
                        {paidPercentage}
                        {t("analysis.paidPercent")}
                    </p>
                </div>
            </div>
        </div>
    );
};

GroupCard.displayName = "GroupCard";
