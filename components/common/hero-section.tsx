import { BrainIcon, Wallet } from "lucide-react";
import { SVGBackground } from "./svg-background";

export const HeroSection = () => (
	<section className="relative w-full rounded-3xl overflow-hidden shadow-xl mb-8 animate-fade-in">
		<SVGBackground />

		<div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-8 md:p-12">
			<div className="flex-1 flex flex-col items-start">
				<span className="mb-3 px-3 py-1 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 text-black text-xs font-semibold shadow">
					NEW FEATURE
				</span>
				<span className="inline-flex items-center justify-center rounded-full bg-white/60 p-4 shadow-lg backdrop-blur-md mb-4">
					<Wallet size={40} className="text-amber-700 drop-shadow-lg" />
				</span>
				<h1 className="text-3xl md:text-5xl font-extrabold md:leading-20 tracking-tight text-clip bg-gradient-to-r from-amber-500 to-amber-700 text-transparent bg-clip-text">
					Smart Debt Tracking
				</h1>
				<p className="text-slate-500 mb-4 max-w-lg text-sm md:text-base">
					Save more, stress less. Visualize and manage your debts with ease.
				</p>
			</div>
			<div className="flex-1 flex justify-center md:justify-end">
				<BrainIcon size={120} className="text-amber-700 drop-shadow-lg" />
			</div>
		</div>
	</section>
);
