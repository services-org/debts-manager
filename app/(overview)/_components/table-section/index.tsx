import { SectionHeader } from "./section-header";
import { SectionBody } from "./section-body";

export const TableSection = () => {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors sm:rounded-2xl dark:border-slate-700 dark:bg-slate-800/50">
            <SectionHeader />
            <SectionBody />
        </div>
    );
};

TableSection.displayName = "TableSection";
