import { Card, CardContent, CardTitle } from "@/components/ui/card";

type TSummaryCard = {
	label: string;
	value: number;
	icon: React.ReactNode;
};

export const SummaryCard = ({ label, value, icon }: TSummaryCard) => (
	<Card
		className={`relative flex flex-col items-start bg-gradient-to-b from-sky-200 to-sky-50 border-2 border-sky-300 rounded-xl shadow-lg px-5 pt-6 pb-4 min-h-[120px] w-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:border-sky-400 group`}>
		<div className="absolute -top-5 -left-5 flex items-center justify-center rounded-full bg-white/90 shadow p-2 border-2 border-sky-200 group-hover:border-sky-400 transition-all">{icon}</div>
		<CardTitle className="mt-2 ml-10 text-base font-semibold text-sky-900 tracking-wide">{label}</CardTitle>
		<CardContent className="text-2xl font-bold text-sky-800 mt-1 ml-10">${value?.toLocaleString()}</CardContent>
	</Card>
);
