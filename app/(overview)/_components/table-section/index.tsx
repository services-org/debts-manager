import { SectionHeader } from "./section-header";
import { SectionBody } from "./section-body";

export const TableSection = () => {
    return (
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 shadow-lg">
            <SectionHeader />
            <SectionBody />
        </div>
    );
};

TableSection.displayName = "TableSection";
