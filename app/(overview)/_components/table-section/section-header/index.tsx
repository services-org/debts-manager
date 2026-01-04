"use client";
import { PlusIcon, SettingsIcon } from "lucide-react";

import { useTranslation } from "@/lib/i18n";
import { GroupsManager } from "./models/groups-manager";
import { AddDebtModel } from "./models/add-debt-model";
import { Button } from "@/components/ui/button";
import { useModel } from "@/hooks";

export const SectionHeader = () => {
    const { t } = useTranslation();
    const { onOpen } = useModel();

    return (
        <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50/50 p-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:p-4 dark:border-slate-700 dark:bg-slate-800/80">
            <h2 className="text-lg font-semibold text-slate-800 sm:text-xl dark:text-slate-100">{t("table.title")}</h2>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-100 sm:flex-none dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                    onClick={() => onOpen("manage-groups")}
                >
                    <SettingsIcon className="size-4" />
                    <span className="xs:inline hidden sm:inline">{t("table.groups")}</span>
                </Button>
                <Button
                    size="sm"
                    className="flex-1 bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-sm hover:from-amber-600 hover:to-orange-600 sm:flex-none"
                    onClick={() => onOpen("add-debt")}
                >
                    <PlusIcon className="size-4 stroke-[2.5]" />
                    <span>{t("table.addDebt")}</span>
                </Button>
            </div>

            <AddDebtModel />
            <GroupsManager />
        </div>
    );
};

SectionHeader.displayName = "SectionHeader";
