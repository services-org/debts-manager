type TAnalysisCard = {
    icon: React.ReactNode;
    value: number;
    label: string;
};

export const AnalysisCard = ({ label, value, icon }: TAnalysisCard) => (
    <div className="relative min-h-[120px] w-full rounded-xl border-2 border-amber-300 bg-gradient-to-br from-amber-200 to-amber-50 px-5 pt-6 pb-4 shadow-lg transition-transform duration-200">
        <div className="absolute -top-5 -left-5 flex items-center justify-center rounded-full border-2 border-amber-200 bg-white/90 p-2 shadow transition-all">
            {icon}
        </div>
        <h3 className="mt-2 ml-10 text-base font-semibold tracking-wide text-amber-900">{label}</h3>
        <p className="mt-1 ml-10 text-2xl font-bold text-amber-800">${value?.toLocaleString()}</p>
    </div>
);

AnalysisCard.displayName = "AnalysisCard";
